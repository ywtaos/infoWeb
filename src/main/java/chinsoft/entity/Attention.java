package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Attention implements java.io.Serializable {
	@JsonProperty
	private String ID;

	private String artistID;
	private String pubMemberID;	
	private String objID;
	
	public String getObjID() {
		return objID;
	}
	public void setObjID(String objID) {
		this.objID = objID;
	}

	private Date pubDate;
	private Member pubMember;
	private Member member;
	private Subject subject;
	private Share share;

	
	public Share getShare() {
		return share;
	}
	public void setShare(Share share) {
		this.share = share;
	}
	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public String getID() {
		return this.ID;
	}

	public void setID(String ID) {
		this.ID = ID;
	}

	public String getArtistID() {
		return this.artistID;
	}

	public void setArtistID(String artistID) {
		this.artistID = artistID;
	}

	public String getPubMemberID() {
		return this.pubMemberID;
	}

	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}

	public Date getPubDate() {
		return this.pubDate;
	}

	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
	}

	public Member getPubMember() {
		return pubMember;
	}

	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}

}