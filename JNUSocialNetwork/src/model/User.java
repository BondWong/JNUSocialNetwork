package model;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import model.modelType.UserType;

@MappedSuperclass
@Access(AccessType.FIELD)
public abstract class User extends AttributeModel{
	@Id
	protected String ID;
	protected String password;
	@Enumerated(EnumType.STRING)
	protected UserType userType;
	
	@Override
	public boolean equals(Object object){
		if(object instanceof User){
			User other = (User) object;
			if(other.ID.equals(this.ID)
					&&other.userType.equals(this.userType)){
				return true;
			}
		}
		return false;
	}
	
	@Override
	public int hashCode(){
		return ID.hashCode() + userType.hashCode();
	}
	
}
