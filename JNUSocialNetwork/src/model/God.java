package model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import model.modelType.UserType;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = { @NamedQuery(name = "God.fetchByID",
	query = "SELECT g FROM God g WHERE g.ID = ?1") })
public class God extends User{
	public God() {}
	
	public void init(Object...initParams) {
		this.available = true;
		this.ID = (String) initParams[0];
		this.password = (String) initParams[1];
		this.userType = UserType.GOD;
	}
	
	public String getID() {
		return this.ID;
	}
	
	@Override
	public String toString() {
		return toRepresentation().toString();
	}

	@Override
	public Map<String, Object> toRepresentation() {
		// TODO Auto-generated method stub
		Map<String, Object> representation = new HashMap<String, Object>();
		representation.put("ID", this.ID);
		return representation;
	}

	@Override
	public void clearAttributes() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map<String, String> getAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAttribute(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setAttribute(String name, String value) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeAttribute(String name) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateAttributes(Map<String, String> attributes) {
		// TODO Auto-generated method stub
		
	}
	
}
