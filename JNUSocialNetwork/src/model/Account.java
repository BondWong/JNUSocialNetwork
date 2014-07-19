package model;

import java.util.Date;
import java.util.Map;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import model.modelType.UserType;

@Entity
@Access(AccessType.FIELD)
@NamedQueries({
		@NamedQuery(name = "Account.fetchBySeriesNum", query = "SELECT a FROM Account a WHERE a.autoLoginSeriesNum = ?1 AND a.available = 1"),
		@NamedQuery(name = "Account.fetchByIDAndUserType", query = "SELECT a FROM Account a WHERE a.ID = ?1 AND a.userType = ?2 AND a.available = 1"),
		@NamedQuery(name = "Account.fetchUnavailableIDs", query = "SELECT a.ID FROM Account a WHERE a.available = 0"), 
		@NamedQuery(name = "Account.deleteUnavailable", query = "DELETE FROM Account a WHERE a.available = 0")})
public class Account extends Model{
	@Id
	@NotNull
	@NotBlank
	@Pattern(regexp = "\\w{1,}")
	private String ID;
	@NotNull
	@NotBlank
	@Pattern(regexp = "\\w{1,}")
	private String password;
	private int chance;
	private String autoLoginSeriesNum;
	@Enumerated(EnumType.STRING)
	private UserType userType;
	@Temporal(TemporalType.TIMESTAMP)
	private Date lastAccessDate;
	@Temporal(TemporalType.TIMESTAMP)
	private Date expireDate;

	public Account() {
		this.chance = 5;
	}

	public String getID() {
		return ID;
	}

	public void setID(String ID) {
		this.ID = ID;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getChance() {
		return chance;
	}

	public void setChance(int chance) {
		this.chance = chance;
	}

	public boolean hasChance() {
		return this.chance > 0;
	}

	public void resetChance() {
		this.chance = 5;
	}

	public String getAutoLoginSeriesNum() {
		return autoLoginSeriesNum;
	}

	public void setAutoLoginSeriesNum(String autoLoginSeriesNum) {
		this.autoLoginSeriesNum = autoLoginSeriesNum;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public Date getLastAccessDate() {
		return lastAccessDate;
	}

	public void setLastAccessDate(Date lastAccessDate) {
		this.lastAccessDate = lastAccessDate;
	}

	public boolean shouldResetChance(Date date) {
		if (this.lastAccessDate == null)
			return false;

		return (date.getTime() - this.getLastAccessDate().getTime()) / 1000
				/ 60 / 60 / 24 >= 1;
	}

	public Date getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}

	public boolean isExpired(Date date) {
		if (this.expireDate == null)
			return true;
		return date.after(expireDate);
	}

	public boolean isProtected(Date date) {
		if (hasChance())
			return false;
		if (shouldResetChance(date)) {
			resetChance();
			return !hasChance();
		}
		return true;
	}

	@Override
	public void init(Object... initParams) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map<String, Object> toRepresentation() {
		// TODO Auto-generated method stub
		return null;
	}

}
