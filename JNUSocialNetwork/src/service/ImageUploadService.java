package service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

import service.helper.ExtensionManager;
import utils.JsonUtil;

@WebServlet("/app/fileUploader")
public class ImageUploadService extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final long MAXIMUMFILESIZE = 1024 * 1024 * 10 * 3;
	private static String root;
	private DiskFileItemFactory factory;
	private ServletFileUpload upload;

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
	}

	private List<String> process(HttpServletRequest request)
			throws FileUploadException,
			FileUploadBase.FileSizeLimitExceededException, Exception {
		List<FileItem> items = upload.parseRequest(request);
		Iterator<FileItem> iter = items.iterator();
		List<String> links = new ArrayList<String>();

		while (iter.hasNext()) {
			FileItem item = iter.next();

			String userID = "";
			if (item.isFormField()) {
				userID = item.getString();
				continue;
			}

			String extention = "";
			if (ExtensionManager.containsKey(item.getContentType()))
				extention = ExtensionManager
						.getExtention(item.getContentType());
			else if (ExtensionManager.containsValue(item.getName().substring(
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
			Image image = new Image(temp, bi.getHeight(), bi.getWidth());
			links.add(JsonUtil.toJson(image));
		}

		return links;
	}
}
