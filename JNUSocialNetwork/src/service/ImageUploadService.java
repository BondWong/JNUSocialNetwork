package service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.structure.Image;
import net.coobird.thumbnailator.Thumbnails;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.gson.reflect.TypeToken;

import service.helper.extensionManager.ExtensionManager;
import service.helper.extensionManager.MultiMediaExtensionManager;
import utils.JsonUtil;

@WebServlet("/app/fileUploader")
public class ImageUploadService extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final long MAXIMUMFILESIZE = 1024 * 1024 * 10 * 3;
	private final static Type TYPE = new TypeToken<Map<String, Integer>>() {
	}.getType();
	private static String root;
	private DiskFileItemFactory factory;
	private ServletFileUpload upload;
	private ExtensionManager em;

	public ImageUploadService() {
		super();
	}

	public void init() {
		setUp();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			boolean isMultipart = ServletFileUpload.isMultipartContent(request);
			if (!isMultipart) {
				throw new FileUploadBase.InvalidContentTypeException();
			}

			List<String> links = process(request);
			response.setContentType("application/json");
			response.setStatus(200);
			System.out.println("about to write back:" + JsonUtil.toJson(links));
			response.getWriter().write(JsonUtil.toJson(links));
			response.flushBuffer();

		} catch (FileUploadBase.InvalidContentTypeException icte) {
			response.sendError(406);
		} catch (FileUploadBase.FileSizeLimitExceededException fsle) {
			response.sendError(413);
		} catch (FileUploadException fue) {
			response.sendError(400);
		} catch (Exception e) {
			response.sendError(500);
		}
	}

	private void setUp() {
		factory = new DiskFileItemFactory();
		File repository = (File) this.getServletContext().getAttribute(
				"javax.servlet.context.tempdir");
		factory.setRepository(repository);
		upload = new ServletFileUpload(factory);
		upload.setSizeMax(MAXIMUMFILESIZE);
		root = getServletConfig().getServletContext().getRealPath("/")
				+ "pages/";
		em = new MultiMediaExtensionManager();
		em.init();
	}

	private List<String> process(HttpServletRequest request)
			throws FileUploadException,
			FileUploadBase.FileSizeLimitExceededException, Exception {
		List<FileItem> items = upload.parseRequest(request);
		Iterator<FileItem> iter = items.iterator();
		List<String> links = new ArrayList<String>();

		String userID = "";
		Map<String, Integer> cropData = null;
		while (iter.hasNext()) {
			FileItem item = iter.next();

			if (item.isFormField() && !item.getFieldName().equals("crop_data")) {
				userID = item.getString();
				continue;
			} else if (item.isFormField()
					&& item.getFieldName().equals("crop_data")) {
				cropData = JsonUtil.fromJson(item.getString(), TYPE);
				continue;
			}

			String extention = "";
			if (em.containsMime(item.getContentType()))
				extention = em.getExtension(item.getContentType());
			else if (em.containsExtension(item.getName().substring(
					item.getName().indexOf("."))))
				extention = item.getName().substring(
						item.getName().indexOf("."));
			else
				continue;

			File dir = new File(root + extention.substring(1));
			if (!dir.exists()) {
				dir.mkdir();
			}

			String temp = extention.substring(1) + "/" + userID + "--"
					+ System.currentTimeMillis() + extention;
			File uploaddedFile = new File(root + temp);
			item.write(uploaddedFile);

			int size = (int) (uploaddedFile.length() / (1024 * 1024));
			if (size >= 1)
				Thumbnails.of(uploaddedFile).scale(0.7f).toFile(uploaddedFile);
			else if (size > 1 && size <= 2)
				Thumbnails.of(uploaddedFile).scale(0.6f).toFile(uploaddedFile);
			else if (size > 2 && size <= 3)
				Thumbnails.of(uploaddedFile).scale(0.5f).toFile(uploaddedFile);
			else if (size > 3)
				Thumbnails.of(uploaddedFile).scale(0.4f).toFile(uploaddedFile);
			BufferedImage bi = ImageIO.read(uploaddedFile);

			if (cropData != null) {
				bi = bi.getSubimage(cropData.get("x"), cropData.get("y"),
						cropData.get("width"), cropData.get("height"));
				ImageIO.write(bi, extention.substring(1), uploaddedFile);
				bi = ImageIO.read(uploaddedFile);
				cropData = null;
			}

			Image image = new Image(temp, bi.getHeight(), bi.getWidth());
			links.add(JsonUtil.toJson(image));
		}

		return links;
	}
}
