package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import utils.DateTimeUtil;
import model.factory.AttributesFactory;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "Comment.fetchByPost", query = "SELECT c FROM Post p JOIN p.comments c WHERE p.ID = ?1 ORDER BY c.ID DESC"),
		@NamedQuery(name = "Comment.fetchByID", query = "SELECT c FROM Comment c WHERE c.ID = ?1"),
		@NamedQuery(name = "Comment.fetchByOwnerSize", query = "SELECT COUNT(c) FROM Comment c WHERE c.available = 1 AND c.owner.ID = ?1"),
		@NamedQuery(name = "Comment.fetchUnavailableIDs", query = "SELECT c.ID FROM Comment c WHERE c.available = 0"),
		@NamedQuery(name = "Comment.deleteUnavailable", query = "DELETE FROM Comment c WHERE c.available = 0") })
public class Comment extends AttributeModel {
	@Id
	private Long ID;
	private String publishDate;
	@Lob
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;

	@ManyToOne
	private Member owner;
	@OneToMany(fetch = FetchType.LAZY)
	private Set<Member> likers;

	public Comment() {
	}

	public void init(Object... initParams) {
		this.ID = System.currentTimeMillis();
		this.available = true;
		this.publishDate = DateTimeUtil.getCurrnetDateTime();
		this.attributes = AttributesFactory.getInstance().create(Comment.class,
				initParams[0]);
		this.likers = new LinkedHashSet<Member>();
	}

	public Long getID() {
		return this.ID;
	}

	public String getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}

	public boolean isAvailable() {
		return available;
	}

	public void delete() {
		this.available = false;
	}

	public Map<String, String> getAttributes() {
		return attributes;
	}

	public String getAttribute(String name) {
		return this.attributes.get(name);
	}

	public void setAttribute(String name, String value) {
		this.attributes.put(name, value);
	}

	public void removeAttribute(String name) {
		this.attributes.remove(name);
	}

	public void clearAttributes() {
		this.attributes.clear();
	}

	@Override
	public void updateAttributes(Map<String, String> attributes) {
		// TODO Auto-generated method stub
		this.attributes.putAll(attributes);
	}

	public Member getOwner() {
		return owner;
	}

	public void setOwner(Member owner) {
		this.owner = owner;
	}

	public void addLiker(Member member) {
		this.likers.add(member);
	}

	public void removeLiker(Member member) {
		this.likers.remove(member);
	}

	public Set<Member> getLikers() {
		return this.likers;
	}

	public void clearLikers() {
		this.likers.clear();
	}

	@Override
	public boolean equals(Object o) {
		if (o instanceof Comment) {
			Comment other = (Comment) o;
			if (other.getID() != null && this.ID != null) {
				if (other.getID().equals(this.ID))
					return true;
			} else if (other.getID() == null && this.ID == null) {
				return super.equals(other);
			} else {
				return false;
			}
		}

		return false;
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
		representation.put("available", this.available);
		representation.put("publishDate", this.publishDate);
		representation.put("attributes", this.attributes);

		if (this.owner != null) {
			Map<String, Object> owner = this.owner.toRepresentation();
			owner.remove("followeeIDs");
			owner.remove("followerIDs");
			representation.put("owner", owner);
		}

		List<String> likerIDs = new ArrayList<String>();
		for (Member member : this.likers) {
			likerIDs.add(member.getID());
		}

		representation.put("likerIDs", likerIDs);
		return representation;
	}

}
