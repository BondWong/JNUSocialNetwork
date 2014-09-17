package persistence;

public interface Deletor {
	public int delete(String deleteQuery, int startIndex, int pageSize,
			Object... params);
}
