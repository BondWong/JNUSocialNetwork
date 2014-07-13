package model;

import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

@MappedSuperclass
@Access(AccessType.FIELD)
public abstract class Model {
	@Version
	protected Integer version;
	protected boolean available = true;
	public void delete() {
		this.available = false;
	}
	public abstract void init(Object... initParams);
	public abstract Map<String, Object> toRepresentation();
}
