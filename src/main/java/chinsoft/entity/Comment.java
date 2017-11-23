package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;
import java.util.List;

public class Comment implements java.io.Serializable{
    @JsonProperty
	private String ID;
    private String shareID;
    private Share share;
    private String content;
    private String attachmentIDs;
    private List<String> attachmentUrls;
    private Integer isAnonymous;
    private String ip;
    private Calendar pubDate;
    private String pubDateStr;

	private String pubMemberID;
    private Member pubMember;
    private String objName;
    private String toMemberID;
    private Member toMember;
    private String pubMemberName;
    
    
	public Share getShare() {
		return share;
	}
	public void setShare(Share share) {
		this.share = share;
	}
	public List<String> getAttachmentUrls() {
		return attachmentUrls;
	}
	public void setAttachmentUrls(List<String> attachmentUrls) {
		this.attachmentUrls = attachmentUrls;
	}
	public String getPubMemberName() {
		return pubMemberName;
	}
	public void setPubMemberName(String pubMemberName) {
		this.pubMemberName = pubMemberName;
	}
	public String getPubDateStr() {
		return pubDateStr;
	}
	public void setPubDateStr(String pubDateStr) {
		this.pubDateStr = pubDateStr;
	}
   
	public String getToMemberID() {
		return toMemberID;
	}
	public void setToMemberID(String toMemberID) {
		this.toMemberID = toMemberID;
	}
	public String getObjName() {
		return objName;
	}
	public void setObjName(String objName) {
		this.objName = objName;
	}
	
	public Member getPubMember() {
		return pubMember;
	}
	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}

	public Member getToMember() {
		return toMember;
	}
	public void setToMember(Member toMember) {
		this.toMember = toMember;
	}
	private String objID;
    private Integer groupID;
    private String groupName;
    private Integer categoryID;
    private String categoryName;
	public String getID() {
		return this.ID;
	}
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getShareID() {
		return this.shareID;
	}
	public void setShareID(String shareID) {
		this.shareID = shareID;
	}
	public String getContent() {
		return this.content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAttachmentIDs() {
		return this.attachmentIDs;
	}
	public void setAttachmentIDs(String attachmentIDs) {
		this.attachmentIDs = attachmentIDs;
	}
	public Integer getIsAnonymous() {
		return this.isAnonymous;
	}
	public void setIsAnonymous(Integer isAnonymous) {
		this.isAnonymous = isAnonymous;
	}
	public String getIp() {
		return this.ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}

	public Calendar getPubDate() {
		return pubDate;
	}
	public void setPubDate(Calendar pubDate) {
		this.pubDate = pubDate;
	}
	public String getPubMemberID() {
		return this.pubMemberID;
	}
	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}
	public String getObjID() {
		return this.objID;
	}
	public void setObjID(String objID) {
		this.objID = objID;
	}
	public Integer getGroupID() {
		return this.groupID;
	}
	public void setGroupID(Integer groupID) {
		this.groupID = groupID;
	}
	public String getGroupName() {
		return this.groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public Integer getCategoryID() {
		return this.categoryID;
	}
	public void setCategoryID(Integer categoryID) {
		this.categoryID = categoryID;
	}
	public String getCategoryName() {
		return this.categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

}