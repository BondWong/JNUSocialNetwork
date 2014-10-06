package model;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@Access(AccessType.FIELD)
@NamedQueries(value = { @NamedQuery(name = "Tag.fetchHeatLookingFor", query = "SELECT t FROM Tag t ORDER BY SIZE(t.lookingForUsers) DESC") })
public class Tag extends Model {
	@Id
	private String ID;
	@ManyToMany(mappedBy = "lookingForTags", fetch = FetchType.LAZY)
	private Set<Member> lookingForUsers;
	@ManyToMany(mappedBy = "activityTypeTags", fetch = FetchType.LAZY)
	private Set<Post> activityTypeUsers;

	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		ID = (String) initParams[0];
		lookingForUsers = new LinkedHashSet<>();
		activityTypeUsers = new LinkedHashSet<>();
	}

	public String getID() {
		return this.ID;
	}

	public void lookingForUsedBy(Member member) {
		this.lookingForUsers.add(member);

	}

	public void lookingForRemovedBy(Member member) {
		this.lookingForUsers.remove(member);
	}

	public void activityTypeUsedBy(Post post) {
		this.activityTypeUsers.add(post);
	}

	public void activityTypeRemovedBy(Post post) {
		this.activityTypeUsers.remove(post);
	}

	@Override
	public Map<String, Object> toRepresentation() {
		// TODO Auto-generated method stub
		Map<String, Object> representation = new HashMap<String, Object>();
		representation.put("ID", this.ID);
		representation.put("lookingForUserNum", this.lookingForUsers.size());
		return representation;
	}

}
