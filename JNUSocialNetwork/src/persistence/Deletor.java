package persistence;

public interface Deletor {
	public <T> int delete(String deleteQuery, Class<T> type, int startIndex, int pageSize, Object...params);
}
