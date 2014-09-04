package model;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import model.modelType.UserType;

@MappedSuperclass
@Access(AccessType.FIELD)
public abstract class User extends AttributeModel {
	@Id
	protected String ID;
	protected String password;
	@Transient
	protected UserType userType;

	public abstract void createPost(Community community, Post post);

	@Override
	public boolean equals(Object object) {
		if (this == object)
			return true;
		if (object instanceof User) {
			User other = (User) object;
			if (other.ID.equals(this.ID)
					&& other.userType.equals(this.userType)) {
				return true;
			}
		}
		return false;
	}

	public abstract void setUserType(UserType userType);

	public abstract UserType getUserType();

	@Override
	public int hashCode() {
		return ID.hashCode() + userType.hashCode();
	}

}
