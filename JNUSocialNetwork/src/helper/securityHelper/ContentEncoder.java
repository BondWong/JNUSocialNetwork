package helper.securityHelper;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class ContentEncoder {
	public Map<String, String> encodeMapContent(Map<String, String> content) {
		Map<String, String> encodedContent = new HashMap<String, String>();
		for (Map.Entry<String, String> entry : content.entrySet()) {
			String value = entry.getValue().replace("<", "");
			value = value.replace(">", "");
			encodedContent.put(entry.getKey(), value);
		}
		return encodedContent;
	}

	public List<String> encodeListContent(List<String> content) {
		List<String> encodedContent = new LinkedList<String>();
		for (String c : content) {
			String value = c.replace("<", "");
			value = value.replace(">", "");
			encodedContent.add(value);
		}

		return encodedContent;
	}

	public String encodeStringContent(String content) {
		String value = content.replace("<", "");
		value = value.replace(">", "");
		return value;
	}
}
