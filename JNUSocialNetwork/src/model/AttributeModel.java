package model;

import java.util.Map;

public abstract class AttributeModel extends Model{
	public abstract void clearAttributes();
	public abstract Map<String, String> getAttributes();
	public abstract String getAttribute(String name);
	public abstract void setAttribute(String name, String value);
	public abstract void removeAttribute(String name);
	public abstract void updateAttributes(Map<String, String> attributes);
}
