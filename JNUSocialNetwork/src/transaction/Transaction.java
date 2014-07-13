package transaction;

public interface Transaction {
	public Object execute(Object...params) throws Exception;
}
