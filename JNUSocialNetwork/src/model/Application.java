package model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import utils.DateTimeUtil;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "Application.fetch", query = "SELECT c FROM Application c WHERE c.available = 1 ORDER BY c.submitDate "),
		@NamedQuery(name = "Application.fetchByID", query = "SELECT c FROM Application c WHERE c.ID = ?1"),
		@NamedQuery(name = "Application.fetchIDs", query = "SELECT a.ID FROM Application a WHERE a.available = 1 ORDER BY a.submitDate"),
		@NamedQuery(name = "Application.fetchUnavailableIDs", query = "SELECT a.ID FROM Application a WHERE a.available = 0"),
		@NamedQuery(name = "Application.deleteUnavailable", query = "DELETE FROM Application a WHERE a.available = 0") })
public class Application extends AttributeModel {
	@Id
	private String ID;
	private String submitDate;
	@Lob
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;

	public Application() {
	}

	@SuppressWarnings("unchecked")
	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		this.submitDate = DateTimeUtil.getCurrnetDateTime();
		this.attributes = (Map<String, String>) initParams[0];
		this.ID = this.attributes.get("ID");
	}

	public String getID() {
		return this.ID;
	}

	public String getSubmitDate() {
		return this.submitDate;
	}

	@Override
	public void clearAttributes() {
		// TODO Auto-generated method stub
		this.attributes.clear();
	}

	@Override
	public Map<String, String> getAttributes() {
		// TODO Auto-generated method stub
		return this.attributes;
	}

	@Override
	public String getAttribute(String name) {
		// TODO Auto-generated method stub
		return this.attributes.get(name);
	}

	@Override
	public void setAttribute(String name, String value) {
		// TODO Auto-generated method stub
		this.attributes.put(name, value);
	}

	@Override
	public void removeAttribute(String name) {
		// TODO Auto-generated method stub
		this.attributes.remove(name);
	}

	@Override
	public void updateAttributes(Map<String, String> attributes) {
		// TODO Auto-generated method stub
		this.attributes.putAll(attributes);
	}

	@Override
	public Map<String, Object> toRepresentation() {
		// TODO Auto-generated method stub
		Map<String, Object> representation = new HashMap<String, Object>();
		representation.put("ID", this.ID);
		representation.put("available", this.available);
		representation.put("submiteDate", this.submitDate);
		representation.put("attributes", this.attributes);
		return representation;
	}

}
