package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;

public class SubjectInvite implements java.io.Serializable{
	
	@JsonProperty
    private String ID;

    private String pubMemberID;

    private String toMemberID;
    
    private Member toMember;

    private Member pubMember;
    
    private String subjectID;

    private Calendar pubDate; 
    
    private String pubDateStr;
    
    private Integer count;
    
    private Subject subject;
    
    
    
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	public Member getToMember() {
		return toMember;
	}
	public void setToMember(Member toMember) {
		this.toMember = toMember;
	}
	public Member getPubMember() {
		return pubMember;
	}
	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getPubDateStr() {
		return this.pubDateStr;
	}
	public void setPubDateStr(String pubDateStr) {
		this.pubDateStr = pubDateStr;
	}
	public String getID() {
		return this.ID ;
	}
	public void setID(String ID) {
		this.ID  = ID;
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
	public String getSubjectID() {
		return this.subjectID;
	}
	public void setSubjectID(String subjectID) {
		this.subjectID = subjectID;
	}
	public Calendar getPubDate() {
		return pubDate;
	}
	public void setPubDate(Calendar pubDate) {
		this.pubDate = pubDate;
	}


}
