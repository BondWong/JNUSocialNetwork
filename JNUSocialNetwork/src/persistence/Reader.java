package persistence;

import java.util.List;

public interface Reader {
	public <T> T get(Class<T> type, Object ID);
	public <T> List<T> read(String queryName, int startIndex, int pageSize, Class<T> type, Object...params);
	public <T> List<T> read(String queryName, Class<T> type, Object...params);
	public <T> T singleRead(String queryName, Class<T> type, Object...params);
	@SuppressWarnings("rawtypes")
	public List combinedRead(String queryName, int startIndex, int pageSize, Object...params);
	@SuppressWarnings("rawtypes")
	public List combinedRead(String queryName, Object...params);
	public Object[] singleCombinedRead(String queryName, Object...params);
}
