package model;

import helper.serviceHelper.DesertFileLinkMap;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import utils.JsonUtil;
import model.factory.AttributesFactory;
import model.modelType.CommunityType;
import model.structure.Image;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "Community.size", query = "SELECT COUNT(c) FROM Community c"),
		@NamedQuery(name = "Community.fetch", query = "SELECT c FROM Community c WHERE c.available = 1 ORDER BY SIZE(c.members) DESC"),
		@NamedQuery(name = "Community.fetchJoined", query = "SELECT jc FROM Member m JOIN m.joinedCommunities jc WHERE m.ID = ?1"),
		@NamedQuery(name = "Community.fetchByOwner", query = "SELECT c FROM Community c WHERE c.owner.ID = ?1"),
		@NamedQuery(name = "Community.fetchByID", query = "SELECT c FROM Community c WHERE c.ID = ?1"),
		@NamedQuery(name = "Community.fetchMyCommunities", query = "SELECT c FROM Community c JOIN c.members ms WHERE c.available = 1 AND (c.owner.ID = ?1 OR (SELECT me FROM Member me WHERE me.ID = ?1) IN ms)"),
		@NamedQuery(name = "Community.signInFetchByType", query = "SELECT c FROM Community c WHERE c.communityType = ?2 AND  c NOT IN (SELECT mc FROM Member m JOIN m.joinedCommunities mc WHERE m.ID = ?1) ORDER BY SIZE(c.members) DESC"),
		@NamedQuery(name = "Community.fetchByType", query = "SELECT c FROM Community c WHERE c.communityType = ?1 ORDER BY SIZE(c.members) DESC"),
		@NamedQuery(name = "Community.fetchByMember", query = "SELECT c FROM Member m JOIN m.joinedCommunities c WHERE m.ID = ?1 ORDER BY SIZE(c.members) DESC"),
		@NamedQuery(name = "Community.fetchUnavailableIDs", query = "SELECT c.ID FROM Community c WHERE c.available = 0"),
		@NamedQuery(name = "Community.deleteUnavailable", query = "DELETE FROM Community c WHERE c.available = 0") })
public class Community extends AttributeModel {
	@Id
	private Long ID;
	@Enumerated(EnumType.STRING)
	private CommunityType communityType;
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> tages;
	@Lob
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;

	@ManyToOne
	private Member owner;
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "joinedCommunities")
	private Set<Member> members;
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Set<Post> posts;

	public Community() {
	}

	@SuppressWarnings("unchecked")
	public void init(Object... initParams) {
		this.ID = System.currentTimeMillis();
		this.available = true;
		this.attributes = AttributesFactory.getInstance().create(
				Community.class, initParams[0]);
		this.tages = new LinkedHashSet<String>();
		tages.addAll((Collection<String>) initParams[1]);
		this.communityType = (CommunityType) initParams[2];
		this.members = new LinkedHashSet<Member>();
		this.posts = new LinkedHashSet<Post>();
	}

	public Long getID() {
		return ID;
	}

	public CommunityType getCommunityType() {
		return communityType;
	}

	public void setCommunityType(CommunityType communityType) {
		this.communityType = communityType;
	}

	public boolean isAvailable() {
		return available;
	}

	public void delete() {
		this.available = false;
	}

	public void addTag(String tag) {
		this.tages.add(tag);
	}

	public void addTags(Set<String> tags) {
		this.tages.addAll(tags);
	}

	public void removeTag(String tag) {
		this.tages.remove(tag);
	}

	public Set<String> getTages() {
		return tages;
	}

	public void clearTags() {
		this.tages.clear();
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

	@Override
	public void updateAttributes(Map<String, String> attributes) {
		// TODO Auto-generated method stub
		this.attributes.putAll(attributes);
	}

	public void clearAttributes() {
		try {
			Image image = JsonUtil.fromJson(this.getAttribute("communityCard"),
					Image.class);
			String link = image.getSrc();
			System.out.println(link);
			if (!link.contains("default")) {
				DesertFileLinkMap.deserialize();
				DesertFileLinkMap.addLink(link);
				DesertFileLinkMap.serialize();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.attributes.clear();
	}

	public Member getOwner() {
		return owner;
	}

	public void setOwner(Member owner) {
		this.owner = owner;
	}

	public void addMember(Member member) {
		this.members.add(member);
	}

	public void removeMember(Member member) {
		this.members.remove(member);
	}

	public Set<Member> getMembers() {
		return this.members;
	}

	public void clearMembers() {
		this.members.clear();
	}

	public void addPost(Post post) {
		this.posts.add(post);
	}

	public void removePost(Post post) {
		this.posts.remove(post);
	}

	public Set<Post> getPosts() {
		return this.posts;
	}

	public void clearPosts() {
		this.posts.clear();
	}

	@Override
	public boolean equals(Object object) {
		if (object instanceof Community) {
			Community other = (Community) object;
			if (other.getID() != null && this.ID != null
					&& other.getID().equals(this.ID))
				return true;
			if (other.getID() == null && this.ID == null)
				return super.equals(other);
		}

		return false;
	}

	@Override
	public int hashCode() {
		return this.ID.hashCode();
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
		representation.put("tags", this.tages);
		representation.put("attributes", this.attributes);
		representation.put("communityType", this.communityType);
		representation.put("ownerID", this.owner.getID());

		List<Map<String, String>> members = new ArrayList<Map<String, String>>();
		for (Member member : this.members) {
			Map<String, String> m = new HashMap<String, String>();
			m.put("ID", member.getID());
			m.put("name", member.getAttribute("name"));
			m.put("avatarLink", member.getAttribute("avatarLink"));
			members.add(m);
		}

		representation.put("members", members);
		return representation;
	}

}
