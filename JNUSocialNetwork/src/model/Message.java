package model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import model.factory.AttributesFactory;
import model.modelType.MessageStatus;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "Message.fetchByID", query = "SELECT m FROM Message m WHERE m.ID = ?1 AND m.available = 1"),
		@NamedQuery(name = "Message.fetchUnread", query = "SELECT m FROM Message m WHERE m.messageStatus != model.modelType.MessageStatus.READ AND m.to.ID = ?1 AND m.available = 1 ORDER BY m.ID DESC"),
		@NamedQuery(name = "Message.fetchUnavailableIDs", query = "SELECT m.ID FROM Message m WHERE m.available = 0"),
		@NamedQuery(name = "Message.deleteUnavailable", query = "DELETE FROM Message m WHERE m.available = 0"),
		@NamedQuery(name = "Message.fetchByChatRoom", query = "SELECT m FROM ChatRoom c JOIN c.messages m WHERE c.ID = ?1 ORDER BY m.ID DESC") })
public class Message extends AttributeModel {
	@Id
	private Long ID;

	@Enumerated(EnumType.STRING)
	private MessageStatus messageStatus;
	private String publishDate;
	@Lob
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;

	@ManyToOne
	private Member from;
	@ManyToOne
	private Member to;
	@ManyToOne
	private ChatRoom chatRoom;

	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		this.available = true;
		this.messageStatus = (MessageStatus) initParams[0];
		this.setPublishDate((String) initParams[1]);
		this.attributes = AttributesFactory.getInstance().create(Comment.class,
				initParams[2]);
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

	public Member getFrom() {
		return from;
	}

	public void setFrom(Member from) {
		this.from = from;
	}

	public Member getTo() {
		return to;
	}

	public void setTo(Member to) {
		this.to = to;
	}

	public ChatRoom getChatRoom() {
		return chatRoom;
	}

	public void setChatRoom(ChatRoom chatRoom) {
		this.chatRoom = chatRoom;
	}

	public MessageStatus getMessageStatus() {
		return messageStatus;
	}

	public void setMessageState(MessageStatus messageStatus) {
		this.messageStatus = messageStatus;
	}

	public String getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
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
		representation.put("publishDate", this.publishDate);
		representation.put("status", this.messageStatus);
		representation.put("attributes", this.attributes);
		representation.put("toID", this.to.getID());
		representation.put("fromID", this.from.getID());
		representation.put("chatRoomID",
				this.chatRoom.toRepresentation().get("ID"));
		representation.put("from", this.from.getAttribute("name"));
		representation.put("avatarLink", this.from.getAttribute("avatarLink"));
		return representation;
	}

}
