package service.helper.extensionManager;

import java.util.HashMap;
import java.util.Map;

public abstract class ExtensionManager {
	protected Map<String, String> mimeExtensionMap = new HashMap<String, String>();

	public abstract void init();

	public boolean containsMime(String mimeType) {
		// TODO Auto-generated method stub
		System.out.println("ExtensionManager:" + mimeType);
		return mimeExtensionMap.containsKey(mimeType);
	}

	public boolean containsExtension(String extension) {
		// TODO Auto-generated method stub
		System.out.println("ExtensionManager:" + extension);
		return mimeExtensionMap.containsValue(extension);
	}

	public String getExtension(String mimeType) {
		return mimeExtensionMap.get(mimeType);
	}
}
