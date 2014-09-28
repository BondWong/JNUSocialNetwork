package service;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchMembersByIDsTransaction;
import transaction.DAOFetchTransaction.FetchPostTransaction;

/**
 * Servlet implementation class FileDownloadService
 */
@WebServlet("/app/fileDownloader")
public class FileDownloadService extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static String root;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FileDownloadService() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void init() {
		root = getServletConfig().getServletContext().getRealPath("/");
		File dir = new File(root + "activityRegisterTemplate");
		if (!dir.exists()) {
			dir.mkdir();
		}
		File file = new File(root + "activityRegisterForm");
		if (!file.exists())
			file.mkdir();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// reads input file from an absolute path
		String type = request.getParameter("type");
		switch (type) {
		case "ACTIVITYNAMELIST":
			try {
				downloadActivityNameList(request, response);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;
		case "REGISTERFORM":
			try {
				downloadRegisterForm(Long.parseLong(request
						.getParameter("activityID")));
			} catch (NumberFormatException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;
		case "ACTIVITYREGISTERS":
			downloadActivityRegisters(Long.parseLong(request
					.getParameter("activityID")));
			break;
		default:
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	@SuppressWarnings({ "unchecked" })
	private void downloadActivityNameList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Long activityID = Long.parseLong(request.getParameter("activityID"));
		System.out.println(activityID);
		Transaction transaction = new FetchPostTransaction();
		Map<String, Object> activity = (Map<String, Object>) transaction
				.execute(activityID);

		Workbook wb = new XSSFWorkbook();
		String version = request.getParameter("version");
		String extension = "xlsx";
		if (version.equals("2007-")) {
			wb = new HSSFWorkbook();
			extension = "xls";
		}
		Sheet sheet = wb.createSheet("名单");

		Row r = sheet.createRow((short) 0);

		CellStyle cellStyle = wb.createCellStyle();
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		Font font = wb.createFont();
		font.setBoldweight((short) 50);
		cellStyle.setFont(font);

		Cell c = r.createCell(0);
		c.setCellValue("序号");
		c.setCellStyle(cellStyle);

		c = r.createCell(1);
		c.setCellValue("ID");
		c.setCellStyle(cellStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
				0, // last row (0-based)
				1, // first column (0-based)
				2 // last column (0-based)
		));

		c = r.createCell(3);
		c.setCellValue("姓名");
		c.setCellStyle(cellStyle);

		c = r.createCell(4);
		c.setCellValue("性別");
		c.setCellStyle(cellStyle);

		c = r.createCell(5);
		c.setCellValue("专业");
		c.setCellStyle(cellStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
				0, // last row (0-based)
				5, // first column (0-based)
				7 // last column (0-based)
		));

		c = r.createCell(8);
		c.setCellValue("学院");
		c.setCellStyle(cellStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
				0, // last row (0-based)
				8, // first column (0-based)
				9 // last column (0-based)
		));

		c = r.createCell(10);
		c.setCellValue("校区");
		c.setCellStyle(cellStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
				0, // last row (0-based)
				10, // first column (0-based)
				11 // last column (0-based)
		));

		c = r.createCell(12);
		c.setCellValue("电话");
		c.setCellStyle(cellStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
				0, // last row (0-based)
				12, // first column (0-based)
				13 // last column (0-based)
		));

		c = r.createCell(14);
		c.setCellValue("邮箱");
		c.setCellStyle(cellStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, // first row (0-based)
				0, // last row (0-based)
				14, // first column (0-based)
				16 // last column (0-based)
		));

		transaction = new FetchMembersByIDsTransaction();
		List<String> IDs = (List<String>) activity.get("participantIDs");
		List<Map<String, Object>> participants = (List<Map<String, Object>>) transaction
				.execute(IDs);
		for (int i = 0; i < participants.size(); i++) {

			sheet.addMergedRegion(new CellRangeAddress(i + 1, // first row
																// (0-based)
					i + 1, // last row (0-based)
					1, // first column (0-based)
					2 // last column (0-based)
			));

			sheet.addMergedRegion(new CellRangeAddress(i + 1, // first row
																// (0-based)
					i + 1, // last row (0-based)
					5, // first column (0-based)
					7 // last column (0-based)
			));

			sheet.addMergedRegion(new CellRangeAddress(i + 1, // first row
					// (0-based)
					i + 1, // last row (0-based)
					8, // first column (0-based)
					9 // last column (0-based)
			));

			sheet.addMergedRegion(new CellRangeAddress(i + 1, // first row
					// (0-based)
					i + 1, // last row (0-based)
					10, // first column (0-based)
					11 // last column (0-based)
			));

			sheet.addMergedRegion(new CellRangeAddress(i + 1, // first row
					// (0-based)
					i + 1, // last row (0-based)
					12, // first column (0-based)
					13 // last column (0-based)
			));

			sheet.addMergedRegion(new CellRangeAddress(i + 1, // first row
					// (0-based)
					i + 1, // last row (0-based)
					14, // first column (0-based)
					16 // last column (0-based)
			));

			Row row = sheet.createRow((short) i + 1);
			CellStyle cs = wb.createCellStyle();
			cs.setAlignment(CellStyle.ALIGN_CENTER);
			cs.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

			Cell cell = row.createCell(0);
			cell.setCellValue(i + 1);
			cell.setCellStyle(cs);

			cell = row.createCell(1);
			cell.setCellValue((String) participants.get(i).get("ID"));
			cell.setCellStyle(cs);

			cell = row.createCell(3);
			cell.setCellValue((String) ((Map<String, String>) participants.get(
					i).get("attributes")).get("name"));
			cell.setCellStyle(cs);

			cell = row.createCell(4);
			cell.setCellValue((String) ((Map<String, String>) participants.get(
					i).get("attributes")).get("gender"));
			cell.setCellStyle(cs);

			cell = row.createCell(5);
			String major = (String) ((Map<String, String>) participants.get(i)
					.get("attributes")).get("major");
			String season = (String) ((Map<String, String>) participants.get(i)
					.get("attributes")).get("season");
			if (major != null && season != null && major != "" && season != "") {
				season = season.substring(season.lastIndexOf("0") + 1);
				major = season + major;
			}
			cell.setCellValue(major);
			cell.setCellStyle(cs);

			cell = row.createCell(8);
			cell.setCellValue((String) ((Map<String, String>) participants.get(
					i).get("attributes")).get("institution"));
			cell.setCellStyle(cs);

			cell = row.createCell(10);
			cell.setCellValue((String) ((Map<String, String>) participants.get(
					i).get("attributes")).get("campus"));
			cell.setCellStyle(cs);

			cell = row.createCell(12);
			cell.setCellValue((String) ((Map<String, String>) participants.get(
					i).get("attributes")).get("telnum"));
			cell.setCellStyle(cs);

			cell = row.createCell(14);
			cell.setCellValue((String) ((Map<String, String>) participants.get(
					i).get("attributes")).get("email"));
			cell.setCellStyle(cs);
		}

		// modifies response
		response.setContentType("application/vnd.ms-excel");

		// forces download
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"",
				activity.get("ID") + "--namelist." + extension);
		response.setHeader(headerKey, headerValue);

		// obtains response's output stream
		OutputStream outStream;
		outStream = response.getOutputStream();

		wb.write(outStream);
		outStream.close();
	}

	@SuppressWarnings("unchecked")
	private void downloadRegisterForm(Long activityID) throws Exception {
		Transaction transaction = new FetchPostTransaction();
		Map<String, Object> post = (Map<String, Object>) transaction
				.execute(activityID);
		String addr = (String) ((Map<String, Object>) post.get("attributes"))
				.get("registerTemplateAddr");
		addr = root + addr;
		File file = new File(addr);

	}

	private void downloadActivityRegisters(Long activityID) {

	}

}
