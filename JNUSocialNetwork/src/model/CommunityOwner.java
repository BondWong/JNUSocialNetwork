package model;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import model.modelType.UserType;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = {
		@NamedQuery(name = "CommunityOwner.fetchByID", query = "SELECT c FROM CommunityOwner c WHERE c.ID = ?1"),
		@NamedQuery(name = "CommunityOwner.fetchUnavailableIDs", query = "SELECT c.ID FROM CommunityOwner c WHERE c.available = 0"),
		@NamedQuery(name = "CommunityOwner.deleteUnavailable", query = "DELETE FROM CommunityOwner c WHERE c.available = 0")})
public class CommunityOwner extends User {
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "owner")
	private Set<Community> communities;

	public CommunityOwner() {
	}

	public void init(Object... initParams) {
		this.available = true;
		this.ID = (String) initParams[0];
		this.password = (String) initParams[1];
		this.userType = UserType.COMMUNITYOWNER;
		this.communities = new LinkedHashSet<Community>();
	}

	public String getID() {
		return this.ID;
	}

	public boolean isAvailable() {
		return this.available;
	}

	public void delete() {
		this.available = false;
	}

	public Set<Community> getCommunities() {
		return this.communities;
	}

	public void clearCommunities() {
		this.communities.clear();
	}

	public void removeMember(Community community, Member member) {
		member.leaveCommunity(community);
	}

	public void createCommunity(Community community) {
		community.setOwner(this);
		this.communities.add(community);
	}
	
	public void createActivity(Community community, Post activity) {
		community.addPost(activity);
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
