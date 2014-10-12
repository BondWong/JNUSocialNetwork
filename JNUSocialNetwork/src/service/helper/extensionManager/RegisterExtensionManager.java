package service.helper.extensionManager;

public class RegisterExtensionManager extends ExtensionManager {

	@Override
	public void init() {
		// TODO Auto-generated method stub
		mimeExtensionMap.clear();
		mimeExtensionMap
				.put("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						".xlsx");
		mimeExtensionMap.put("application/vnd.ms-excel", ".xls");
		mimeExtensionMap.put("application/kset", ".et");
		mimeExtensionMap
				.put("application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						".docx");
		mimeExtensionMap
				.put("application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						".docx");
		mimeExtensionMap.put("application/msword", ".doc");
		mimeExtensionMap.put("application/kswps", ".wps");
	}

}
