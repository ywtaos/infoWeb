package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.List;

public class Subject {
	@JsonProperty
	private String ID ;
	private String pubMemberID;
	private Date pubDate;
	private Integer isTopID;
	private String isTopName;
	private String title;
	private Integer readStatus;
	private Integer fanCount;
	private Integer readCount;
	private Integer shareCount;
	private Integer attentionCount;
	private Integer	attitudeCount;
	private Share share;
	private String imageAttachmentIDs;
    private List<String> imageAttachmentUrls;
    private boolean isAttention;
    private String link;
    
    
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
    
    public Integer getAttitudeCount() {
		return attitudeCount;
	}
	public void setAttitudeCount(Integer attitudeCount) {
		this.attitudeCount = attitudeCount;
	}
	public Integer getAttentionCount() {
		return attentionCount;
	}
	public void setAttentionCount(Integer attentionCount) {
		this.attentionCount = attentionCount;
	}
	public boolean isAttention() {
		return isAttention;
	}
	public void setIsAttention(boolean isAttention) {
		this.isAttention = isAttention;
	}

	public Integer getReadCount() {
		return readCount;
	}
	public void setReadCount(Integer readCount) {
		this.readCount = readCount;
	}
	public void setAttention(boolean isAttention) {
		this.isAttention = isAttention;
	}
	public String getImageAttachmentIDs() {
		return imageAttachmentIDs;
	}
	public void setImageAttachmentIDs(String imageAttachmentIDs) {
		this.imageAttachmentIDs = imageAttachmentIDs;
	}
	public List<String> getImageAttachmentUrls() {
		return imageAttachmentUrls;
	}
	public void setImageAttachmentUrls(List<String> imageAttachmentUrls) {
		this.imageAttachmentUrls = imageAttachmentUrls;
	}
	
	private String description;

	public Share getShare() {
		return share;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setShare(Share share) {
		this.share = share;
	}

	public Integer getReadStatus() {
		return readStatus;
	}
	public void setReadStatus(Integer readStatus) {
		this.readStatus = readStatus;
	}


	public Integer getFanCount() {
		return fanCount;
	}
	public void setFanCount(Integer fanCount) {
		this.fanCount = fanCount;
	}
	public Integer getShareCount() {
		return shareCount;
	}
	public void setShareCount(Integer shareCount) {
		this.shareCount = shareCount;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getIsTopName() {
		return isTopName;
	}
	public void setIsTopName(String isTopName) {
		this.isTopName = isTopName;
	}
	public String getPubMemberID() {
		return pubMemberID;
	}
	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}
	public Date getPubDate() {
		return pubDate;
	}
	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
	}
	public Integer getIsTopID() {
		return isTopID;
	}
	public void setIsTopID(Integer isTopID) {
		this.isTopID = isTopID;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
}
