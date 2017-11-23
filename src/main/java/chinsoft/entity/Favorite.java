package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Favorite implements java.io.Serializable {
	@JsonProperty
	private String ID;
	private String ProductID;
	private String pubMemberID;
	private Date pubDate;
	private Member pubMember;
	public Member getPubMember() {
		return pubMember;
	}

	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}

	public String getID() {
		return this.ID;
	}

	public void setID(String ID) {
		this.ID = ID;
	}

	public String getProductID() {
		return ProductID;
	}

	public void setProductID(String productID) {
		ProductID = productID;
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

}