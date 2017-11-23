package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Rate implements java.io.Serializable{
	@JsonProperty
    private String ID;

    private String pubMemberID;

    private String toMemberID;

    private Integer starID;

    private String starName;

    private Date pubDate;
  
    private String comment;
    
    private Member pubMember;
    
	public Member getPubMember() {
		return pubMember;
	}
	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}
	public String getID() {
		return this.ID 

;
	}
	public void setID(String ID) {
		this.ID 

 = ID;
	}
	public String getPubMemberID() {
		return this.pubMemberID;
	}
	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}
	public String getToMemberID() {
		return this.toMemberID;
	}
	public void setToMemberID(String toMemberID) {
		this.toMemberID = toMemberID;
	}
	public Integer getStarID() {
		return this.starID;
	}
	public void setStarID(Integer starID) {
		this.starID = starID;
	}
	public String getStarName() {
		return this.starName;
	}
	public void setStarName(String starName) {
		this.starName = starName;
	}
	public Date getPubDate() {
		return this.pubDate;
	}
	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
	}
	public String getComment() {
		return this.comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}

}
