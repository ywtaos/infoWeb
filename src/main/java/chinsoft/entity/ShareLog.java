package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;

public class ShareLog implements java.io.Serializable{
	@JsonProperty
    private String ID;

    private String pubMemberID;
    private Member pubMember;
    private Integer shareLogCategoryID;
    private Integer ShareLogTargetID;

    private String shareLogCategoryName;
    private String shareLogTargetName;
    private Calendar pubDate;
    private String pubDateStr;
    
    

    public Member getPubMember() {
		return pubMember;
	}
	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}
	public String getPubDateStr() {
		return pubDateStr;
	}
	public void setPubDateStr(String pubDateStr) {
		this.pubDateStr = pubDateStr;
	}
	private String shareID;         
    private Share share;
    
	public Share getShare() {
		return share;
	}
	public void setShare(Share share) {
		this.share = share;
	}
	public String getShareLogTargetName() {
		return shareLogTargetName;
	}
	public void setShareLogTargetName(String shareLogTargetName) {
		this.shareLogTargetName = shareLogTargetName;
	}
	public Integer getShareLogTargetID() {
		return ShareLogTargetID;
	}
	public void setShareLogTargetID(Integer shareLogTargetID) {
		ShareLogTargetID = shareLogTargetID;
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
	public Integer getShareLogCategoryID() {
		return this.shareLogCategoryID;
	}
	public void setShareLogCategoryID(Integer shareLogCategoryID) {
		this.shareLogCategoryID = shareLogCategoryID;
	}
	public String getShareLogCategoryName() {
		return this.shareLogCategoryName;
	}
	public void setShareLogCategoryName(String shareLogCategoryName) {
		this.shareLogCategoryName = shareLogCategoryName;
	}

	public Calendar getPubDate() {
		return pubDate;
	}
	public void setPubDate(Calendar pubDate) {
		this.pubDate = pubDate;
	}
	public String getShareID() {
		return this.shareID;
	}
	public void setShareID(String shareID) {
		this.shareID = shareID;
	}

}
