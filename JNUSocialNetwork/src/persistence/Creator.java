package persistence;

public interface Creator {
	public <T> void create(T t);
}
