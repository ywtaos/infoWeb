package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;

public class Attitude implements java.io.Serializable{
    @JsonProperty
	private String ID;
    private String pubMemberID;
	private String objID;
	private Member pubMember;
    public Member getPubMember() {
		return pubMember;
	}
	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}
	private Calendar pubDate;
    private Integer categoryID;
    private String categoryName;
	public String getID() {
		return this.ID;
	}
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getPubMemberID() {
		return this.pubMemberID;
	}
	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}


	public String getObjID() {
		return objID;
	}
	public void setObjID(String objID) {
		this.objID = objID;
	}
	
	
	
	public Calendar getPubDate() {
		return pubDate;
	}
	public void setPubDate(Calendar pubDate) {
		this.pubDate = pubDate;
	}
	public Integer getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(Integer categoryID) {
		this.categoryID = categoryID;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

}