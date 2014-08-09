package model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import model.modelType.SSEType;
import utils.JsonUtil;

@Entity
@Access(AccessType.FIELD)
@NamedQueries({ @NamedQuery(name = "ServerSentEvent.fetchUnhandled", query = "SELECT s FROM Member m JOIN m.unhandledEvents s WHERE m.ID = ?1"),
				@NamedQuery(name = "ServerSentEvent.fetchUnavailableIDs", query = "SELECT s.ID FROM ServerSentEvent s WHERE s.available = 0"),
				@NamedQuery(name = "ServerSentEvent.deleteUnavailable", query = "DELETE FROM ServerSentEvent s WHERE s.available = 0")})
public class ServerSentEvent extends Model{
	@Id
	private Long ID;
	private String name;
	private String data;
	
	public ServerSentEvent() {}
	
	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		this.name = ((SSEType)initParams[0]).name();
		this.data = JsonUtil.toJson(initParams[1]);
	}
	
	public Long getID() {
		return ID;
	}
	
	public void setID(Long ID) {
		this.ID = ID;
	}
	
	public void delete() {
		this.available = false;
	}

	public String getName() {
		return name;
	}
	
	public String getData() {
		return data;
	}
	
	public String toString() {
		return this.name + "\n" + this.data;
	}

	@Override
	public Map<String, Object> toRepresentation() {
		// TODO Auto-generated method stub
		Map<String, Object> representation = new HashMap<String, Object>();
		representation.put("name", this.name);
		representation.put("data", this.data);
		return representation;
	}
	
}
