package model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import utils.DateTimeUtil;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "Application.fetch", query = "SELECT c FROM Application c ORDER BY c.submitDate"),
		@NamedQuery(name = "Application.fetchUnavailableIDs", query = "SELECT a.ID FROM Application a WHERE a.available = 0"),
		@NamedQuery(name = "Application.deleteUnavailable", query = "DELETE FROM Application a WHERE a.available = 0")})
public class Application extends AttributeModel {
	@Id
	private Long ID;
	@ManyToOne
	private Member applicant;
	private String submitDate;
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;

	public Application() {
	}

	@SuppressWarnings("unchecked")
	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		this.ID = System.currentTimeMillis();
		this.submitDate = DateTimeUtil.getCurrnetDateTime();
		this.attributes = (Map<String, String>) initParams[0];
	}

	public Long getID() {
		return this.ID;
	}

	public Member getApplicant() {
		return applicant;
	}

	public void setApplicant(Member applicant) {
		this.applicant = applicant;
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
		if(this.applicant != null) {
			Map<String, Object> applicant = this.applicant.toRepresentation();
			applicant.remove("followeeIDs");
			applicant.remove("followerIDs");
			representation.put("applicant", applicant);
		}
		return representation;
	}

}
