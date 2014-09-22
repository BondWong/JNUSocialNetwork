package model;

import java.io.IOException;
import java.util.ArrayList;
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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import service.helper.DesertFileLinkMap;
import utils.JsonUtil;
import model.communityOwnerFeature.CommunityOwner;
import model.communityOwnerFeature.CommunityOwnerFeature;
import model.communityOwnerFeature.NonCommunityOwner;
import model.factory.AttributesFactory;
import model.modelType.UserType;
import model.structure.Image;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "Member.size", query = "SELECT COUNT(m) FROM Member m"),
		@NamedQuery(name = "Member.fetchFollowees", query = "SELECT f FROM Member m JOIN m.followees f WHERE m.ID = ?1"),
		@NamedQuery(name = "Member.fetchFollowers", query = "SELECT f FROM Member m JOIN m.followers f WHERE m.ID = ?1"),
		@NamedQuery(name = "Member.fetchByID", query = "SELECT m FROM Member m WHERE m.ID = ?1"),
		@NamedQuery(name = "Member.fetch", query = "SELECT m FROM Member m WHERE m.available = 1"),
		@NamedQuery(name = "Member.fetchIDs", query = "SELECT m.ID FROM Member m WHERE m.available = 1"),
		@NamedQuery(name = "Member.fetchFamous", query = "SELECT m FROM Member m WHERE m.available = 1 ORDER BY SIZE(m.followers) DESC"),
		@NamedQuery(name = "Member.loginFetchFamous", query = "SELECT m FROM Member m WHERE m.available = 1 AND m.ID != ?1 AND m NOT IN (SELECT f FROM Member o JOIN o.followees f WHERE o.ID = ?1) ORDER BY SIZE(m.followers) DESC"),
		@NamedQuery(name = "Member.fetchUnavailableIDs", query = "SELECT m.ID FROM Member m WHERE m.available = 0"),
		@NamedQuery(name = "Member.deleteUnavailable", query = "DELETE FROM Member m WHERE m.available = 0") })
public class Member extends User {
	@Lob
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> imageLinks;
	@Lob
	@ElementCollection(fetch = FetchType.EAGER)
	private Map<String, String> attributes;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "owner")
	private Set<Community> createdCommunities;
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "owner")
	private Set<Post> createdPosts;
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinTable(name = "MEMBER_COLLECTEDPOST", joinColumns = @JoinColumn(name = "MEMBER_ID"), inverseJoinColumns = @JoinColumn(name = "POST_ID"))
	private Set<Post> collectedPosts;
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinTable(name = "MEMBER_JOINEDCOMMUNITY", joinColumns = @JoinColumn(name = "MEMBER_ID"), inverseJoinColumns = @JoinColumn(name = "COMMUNITY_ID"))
	private Set<Community> joinedCommunities;
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinTable(name = "MEMBER_UNHANDLEDEVENTS", joinColumns = @JoinColumn(name = "MEMBER_ID"), inverseJoinColumns = @JoinColumn(name = "COMMENT_ID"))
	private Set<ServerSentEvent> unhandledEvents;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "MEMBER_FOLLOWEE", joinColumns = @JoinColumn(name = "MEMBER_ID"), inverseJoinColumns = @JoinColumn(name = "OTHERMEMBER_ID"))
	private Set<Member> followees;
	@ManyToMany(mappedBy = "followees", fetch = FetchType.LAZY)
	private Set<Member> followers;
	@Transient
	private CommunityOwnerFeature communityOwnerFeature;

	public Member() {
	}

	public void init(Object... initParams) {
		this.available = true;
		this.ID = (String) initParams[0];
		this.password = (String) initParams[1];
		this.imageLinks = new LinkedHashSet<String>();
		this.createdPosts = new LinkedHashSet<Post>();
		this.createdCommunities = new LinkedHashSet<Community>();
		this.collectedPosts = new LinkedHashSet<Post>();
		this.joinedCommunities = new LinkedHashSet<Community>();
		this.unhandledEvents = new LinkedHashSet<ServerSentEvent>();
		this.followees = new LinkedHashSet<Member>();
		this.followers = new LinkedHashSet<Member>();
		this.userType = (UserType) initParams[2];
		switch (this.userType) {
		case MEMBER:
			this.attributes = AttributesFactory.getInstance().create(
					Member.class, initParams[3]);
			this.setAttribute("season", this.ID.substring(0, 4));
			this.communityOwnerFeature = new NonCommunityOwner();
			break;
		case COMMUNITYOWNER:
			this.attributes = AttributesFactory.getInstance().create(
					CommunityOwner.class, initParams[3]);
			this.communityOwnerFeature = new CommunityOwner();
			break;
		case GOD:
			break;
		}
	}

	public String getID() {
		return ID;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAvailable() {
		return this.available;
	}

	public void delete() {
		this.available = false;
	}

	@Access(AccessType.PROPERTY)
	@Enumerated(EnumType.STRING)
	public UserType getUserType() {
		return this.userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
		if (userType.equals(UserType.COMMUNITYOWNER))
			this.communityOwnerFeature = new CommunityOwner();
		else
			this.communityOwnerFeature = new NonCommunityOwner();
	}

	public void addImageLink(String link) {
		imageLinks.add(link);
	}

	public void addImageLinks(Set<String> links) {
		this.imageLinks.addAll(links);
	}

	public void removeImageLink(String link) {
		try {
			DesertFileLinkMap.deserialize();
			DesertFileLinkMap.addLink(link);
			DesertFileLinkMap.serialize();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Set<String> temp = new LinkedHashSet<String>();
		for (String postImageLink : this.imageLinks) {
			if (!postImageLink.contains(link))
				temp.add(postImageLink);
		}
		this.imageLinks = temp;
	}

	public void removeImageLinks(Set<String> links) {
		try {
			DesertFileLinkMap.deserialize();
			DesertFileLinkMap.addLinks(links);
			DesertFileLinkMap.serialize();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Set<String> temp = new LinkedHashSet<String>();
		for (String postImageLink : this.imageLinks) {
			for (String imageLink : links) {
				if (!postImageLink.contains(imageLink))
					temp.add(postImageLink);
			}
		}
		this.imageLinks = temp;
	}

	public Set<String> getImageLinks() {
		return imageLinks;
	}

	public void clearImageLinks() {
		try {
			DesertFileLinkMap.deserialize();
			DesertFileLinkMap.addLinks(this.imageLinks);
			DesertFileLinkMap.serialize();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.imageLinks.clear();
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
			Image image = JsonUtil.fromJson(this.getAttribute("avatarLink"),
					Image.class);
			String link = image.getSrc();
			if (!link.contains("default")) {
				DesertFileLinkMap.deserialize();
				DesertFileLinkMap.addLink(link);
				DesertFileLinkMap.serialize();
			}
			image = JsonUtil.fromJson(this.getAttribute("profileImageLink"),
					Image.class);
			link = image.getSrc();
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

	public void createPost(Post post) {
		post.setOwner(this);
		this.createdPosts.add(post);
	}

	public void createPost(Community community, Post post) {
		post.setOwner(this);
		this.createdPosts.add(post);
		community.addPost(post);
	}

	public Set<Post> getCreatedPosts() {
		return this.createdPosts;
	}

	public void clearCreatedPosts() {
		this.createdPosts.clear();
	}

	public Set<Post> getCollectedPosts() {
		return this.collectedPosts;
	}

	public void likePost(Post post) {
		post.addLiker(this);
	}

	public void cancelLikePost(Post post) {
		post.removeLiker(this);
	}

	public void collectPost(Post post) {
		post.addCollector(this);
		this.collectedPosts.add(post);
	}

	public void cancelCollectPost(Post post) {
		post.removeCollector(this);
		this.collectedPosts.remove(post);
	}

	public void clearCollectPost() {
		this.collectedPosts.clear();
	}

	public void joinActivity(Post activity) {
		activity.addParticipant(this);
	}

	public void leaveActivity(Post activity) {
		activity.removeParticipant(this);
	}

	public void createComment(Post post, Comment comment) {
		comment.setOwner(this);
		post.addComment(comment);
	}

	public void likeComment(Comment comment) {
		comment.addLiker(this);
	}

	public void cancelLikeComment(Comment comment) {
		comment.removeLiker(this);
	}

	public void addUnhandledEvent(ServerSentEvent sse) {
		this.unhandledEvents.add(sse);
	}

	public Set<ServerSentEvent> getUnhandledEvents() {
		return unhandledEvents;
	}

	public void removeUnhandledEvent(ServerSentEvent sse) {
		this.unhandledEvents.remove(sse);
	}

	public void clearUnhandledEvents() {
		this.unhandledEvents.clear();
	}

	public void joinCommunity(Community community) {
		community.addMember(this);
		this.joinedCommunities.add(community);
	}

	public void leaveCommunity(Community community) {
		community.removeMember(this);
		this.joinedCommunities.remove(community);
	}

	public Set<Community> getJoinedCommunities() {
		return this.joinedCommunities;
	}

	public void clearJoinedCommunities() {
		this.joinedCommunities.clear();
	}

	public void follow(Member member) {
		this.followees.add(member);
		member.followers.add(this);
	}

	public void cancelFollow(Member member) {
		this.followees.remove(member);
		member.followers.remove(this);
	}

	public Set<Member> getFollowees() {
		return this.followees;
	}

	public void clearFollowees() {
		this.followees.clear();
	}

	public Set<Member> getFollowers() {
		return this.followers;
	}

	public void clearFollowers() {
		this.followers.clear();
	}

	public Set<Community> getCreatedCommunities() {
		return this.createdCommunities;
	}

	public void clearCommunities() {
		this.createdCommunities.clear();
	}

	public void createCommunity(Community community) {
		this.communityOwnerFeature.createCommunity(this, community);
	}

	public void removeMember(Community community, Member member) {
		// TODO Auto-generated method stub
		this.communityOwnerFeature.removeMember(community, member);
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
		representation.put("imageLinks", this.imageLinks);
		representation.put("attributes", this.attributes);
		representation.put("userType", this.userType);

		List<String> followeeIDs = new ArrayList<String>();
		for (Member followee : this.followees) {
			followeeIDs.add(followee.getID());
		}
		List<String> followerIDs = new ArrayList<String>();
		for (Member follower : this.followers) {
			followerIDs.add(follower.getID());
		}

		representation.put("followeeIDs", followeeIDs);
		representation.put("followerIDs", followerIDs);

		List<Long> communityIDs = new ArrayList<Long>();
		for (Community community : this.createdCommunities)
			communityIDs.add(community.getID());
		return representation;
	}

}
