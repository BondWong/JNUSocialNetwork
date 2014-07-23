package utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class DesertFileLinkManager {
	private static List<String> links = new ArrayList<String>();

	public static void addLink(String link) {
		links.add(link);
	}

	public static void removeLink(String link) {
		links.remove(link);
	}

	public static void addLinks(Collection<String> links) {
		links.addAll(links);
	}

	public static void removeLinks() {
		links.clear();
	}
	
	public static List<String> getLinks() {
		return links;
	}
	
}
