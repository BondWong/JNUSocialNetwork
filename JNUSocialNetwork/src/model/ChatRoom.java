package model;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import model.factory.AttributesFactory;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "ChatRoom.fetchUnavailableIDs", query = "SELECT c.ID FROM ChatRoom c WHERE c.available = 0"),
		@NamedQuery(name = "ChatRoom.deleteUnavailable", query = "DELETE FROM ChatRoom c WHERE c.available = 0"),
		@NamedQuery(name = "ChatRoom.fetchAbandoned", query = "SELECT c FROM ChatRoom c WHERE c.lastAccessTime < ?1")})
public class ChatRoom extends AttributeModel{
	@Id
	private String ID;
	
	@Temporal(TemporalType.DATE)
	private Date lastAccessTime;
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Set<Message> messages;
	
	public ChatRoom() {}
	
	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		this.available = true;
		this.ID = "" + ((Long.parseLong((String) initParams[0]) 
				+ Long.parseLong((String) initParams[1])) 
				+ ((Long.parseLong(((String) initParams[0]).substring(4)) 
						* Long.parseLong(((String) initParams[1]).substring(4)))));
		this.lastAccessTime = new Date();
		this.attributes = AttributesFactory.getInstance().create(Comment.class,
				initParams[2]);
		this.messages = new LinkedHashSet<Message>();
	}
	
	public String getID() {
		return this.ID;
	}
	
	public void delete() {
		this.available = false;
	}
	
	public Date getLastAccessTime() {
		return lastAccessTime;
	}

	public void setLastAccessTime(Date lastAccessTime) {
		this.lastAccessTime = lastAccessTime;
	}

	public void setAttribute(String name, String value) {
		this.attributes.put(name, value);
	}
	
	public String getAttribute(String name) {
		return this.attributes.get(name);
	}
	
	public void removeAttribute(String name) {
		this.attributes.remove(name);
	}
	
	public Map<String, String> getAttributes() {
		return this.attributes;
	}
	
	@Override
	public void updateAttributes(Map<String, String> attributes) {
		// TODO Auto-generated method stub
		this.attributes.putAll(attributes);
	}

	public Set<Message> getMessages() {
		return messages;
	}

	public void setMessages(Set<Message> messages) {
		this.messages = messages;
	}

	public void clearAttributes() {
		this.attributes.clear();
	}
	
	public void addMessage(Message message) {
		message.setChatRoom(this);
		this.messages.add(message);
	}
	
	public void removeMessage(Message message) {
		this.messages.remove(message);
	}
	
	public void cleaMessages() {
		this.messages.clear();
	}

	@Override
	public Map<String, Object> toRepresentation() {
		// TODO Auto-generated method stub
		Map<String, Object> representation = new HashMap<String, Object>();
		representation.put("ID", this.ID);
		representation.put("available", this.available);
		representation.put("attributes", this.attributes);
		representation.put("messagesSize", this.messages.size());
		
		return representation;
	}
	
}
