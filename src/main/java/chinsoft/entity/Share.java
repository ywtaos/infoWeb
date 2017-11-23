package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Calendar;
import java.util.List;

public class Share implements java.io.Serializable{
	
	@JsonProperty
    private String ID;
    private String title;
    private String content;
    private String shareContent;
    private String shContent;     
    private String link;
    
    
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getShContent() {
		return shContent;
	}
	public void setShContent(String shContent) {
		this.shContent = shContent;
	}
	public String getShareContent() {
		return shareContent;
	}
	public void setShareContent(String shareContent) {
		this.shareContent = shareContent;
	}
	private Integer statusID;
    private String statusName;
    
    private Integer attitudeCount;
    private Integer commentCount; 
    private Integer relayCount;
    private Integer attentionCount;
   
	private String attitudeCounts;
    private String commentCounts; 
    private String relayCounts;
    private String attentionCounts;
    private String readCounts;
    
    private String shareParentID;
    private String shareRootID;
    private Share  shareRoot;
    public Integer hotID;
    private String address;
    private String lng;
    private String lat;
    private String videoUrl;
    private String videoImageUrl;
    private boolean isAttention;
    
    private boolean isAttitude;
    private String locationID;
    private String locationName;
    
    
    public String getLocationID() {
		return locationID;
	}
	public void setLocationID(String locationID) {
		this.locationID = locationID;
	}
	public String getLocationName() {
		return locationName;
	}
	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}
	public String getReadCounts() {
		return readCounts;
	}
	public void setReadCounts(String readCounts) {
		this.readCounts = readCounts;
	}
	public boolean getIsAttitude() {
		return isAttitude;
	}
	public void setIsAttitude(boolean isAttitude) {
		this.isAttitude = isAttitude;
	}
	public boolean getIsAttention() {
		return isAttention;
	}
	public void setIsAttention(boolean isAttention) {
		this.isAttention = isAttention;
	}
	public Share getShareRoot() {
		return shareRoot;
	}
	public void setShareRoot(Share shareRoot) {
		this.shareRoot = shareRoot;
	}
	public Integer getAttentionCount() {
		return attentionCount;
	}
	public void setAttentionCount(Integer attentionCount) {
		this.attentionCount = attentionCount;
	}
	public String getAttentionCounts() {
		return attentionCounts;
	}
	public void setAttentionCounts(String attentionCounts) {
		this.attentionCounts = attentionCounts;
	}
    public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getHotID() {
		return hotID;
	}
	public void setHotID(Integer hotID) {
		this.hotID = hotID;
	}
	public String getHotName() {
		return hotName;
	}
	public void setHotName(String hotName) {
		this.hotName = hotName;
	}
	public String hotName;
 
	public String getShareParentID() {
		return shareParentID;
	}
	public void setShareParentID(String shareParentID) {
		this.shareParentID = shareParentID;
	}
	public String getShareRootID() {
		return shareRootID;
	}
	public void setShareRootID(String shareRootID) {
		this.shareRootID = shareRootID;
	}

	public String getCommentCounts() {
		return commentCounts;
	}
	public void setCommentCounts(String commentCounts) {
		this.commentCounts = commentCounts;
	}
	public String getRelayCounts() {
		return relayCounts;
	}
	public void setRelayCounts(String relayCounts) {
		this.relayCounts = relayCounts;
	}
	private Integer tag;
    private String AttachmentIDs;
    private Integer isPublic;
    private Calendar pubDate;
    public Calendar getPubDate() {
		return pubDate;
	}
	private String pubDateStr;
    public String getPubDateStr() {
		return pubDateStr;
	}
	public void setPubDateStr(String pubDateStr) {
		this.pubDateStr = pubDateStr;
	}
	public void setPubDate(Calendar pubDate) {
		this.pubDate = pubDate;
	}
	private String pubMemberID;
    
    private String videoImageAttachmentID;
    private Integer isRecommendID;
    //private String isRecommendName;
    private Integer isTopID;
    private String isTopName;
    public String getIsTopName() {
		return isTopName;
	}
	public void setIsTopName(String isTopName) {
		this.isTopName = isTopName;
	}
	private Integer isFocusID;
	private String isFocusName;
	   
	public String getIsFocusName() {
		return isFocusName;
	}
	public void setIsFocusName(String isFocusName) {
		this.isFocusName = isFocusName;
	}
	private Integer categoryID;
    private String categoryName;   
    private String description;   
    private String subjectID;
    private Integer typeID;
    private String typeName; 
	private Member pubMember;
    private Subject subject;
    private String imageIDs;
    private List<String> imageUrls;
    private List<String> imageUrlViews;
    private List<Comment> comments;
    private List<Attitude> attitudes;
    private boolean hasVideo;
    
    
    public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Integer getIsFocusID() {
		return isFocusID;
	}
	public void setIsFocusID(Integer isFocusID) {
		this.isFocusID = isFocusID;
	}
    
	public List<String> getImageUrlViews() {
		return imageUrlViews;
	}
	public void setImageUrlViews(List<String> imageUrlViews) {
		this.imageUrlViews = imageUrlViews;
	}
	public Integer getTypeID() {
		return typeID;
	}
	public void setTypeID(Integer typeID) {
		this.typeID = typeID;
	}
    public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	public List<String> getImageUrls() {
		return imageUrls;
	}
	public void setImageUrls(List<String> imageUrls) {
		this.imageUrls = imageUrls;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public List<Attitude> getAttitudes() {
		return attitudes;
	}
	public void setAttitudes(List<Attitude> attitudes) {
		this.attitudes = attitudes;
	}
	public String getDescription() {
		return description;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImageIDs() {
		return imageIDs;
	}
	public void setImageIDs(String imageIDs) {
		this.imageIDs = imageIDs;
	}
	public String getSubjectID() {
		return subjectID;
	}
	public void setSubjectID(String subjectID) {
		this.subjectID = subjectID;
	}
    
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getStatusID() {
		return statusID;
	}
	public void setStatusID(Integer statusID) {
		this.statusID = statusID;
	}

	public Integer getAttitudeCount() {
		return attitudeCount;
	}
	public void setAttitudeCount(Integer attitudeCount) {
		this.attitudeCount = attitudeCount;
	}
	public String getAttitudeCounts() {
		return attitudeCounts;
	}
	public void setAttitudeCounts(String attitudeCounts) {
		this.attitudeCounts = attitudeCounts;
	}
	public Integer getCommentCount() {
		return commentCount;
	}
	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}
	public Integer getRelayCount() {
		return relayCount;
	}
	public void setRelayCount(Integer relayCount) {
		this.relayCount = relayCount;
	}
	
	public Integer getTag() {
		return tag;
	}
	public void setTag(Integer tag) {
		this.tag = tag;
	}
	public String getAttachmentIDs() {
		return AttachmentIDs;
	}
	public void setAttachmentIDs(String attachmentIDs) {
		AttachmentIDs = attachmentIDs;
	}
	public Integer getIsPublic() {
		return isPublic;
	}
	public void setIsPublic(Integer isPublic) {
		this.isPublic = isPublic;
	}
	public String getPubMemberID() {
		return pubMemberID;
	}
	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}
	
	public Member getPubMember() {
		return pubMember;
	}
	public void setPubMember(Member pubMember) {
		this.pubMember = pubMember;
	}
	public String getVideoImageAttachmentID() {
		return videoImageAttachmentID;
	}
	public void setVideoImageAttachmentID(String videoImageAttachmentID) {
		this.videoImageAttachmentID = videoImageAttachmentID;
	}
	public Integer getIsRecommendID() {
		return isRecommendID;
	}
	public void setIsRecommendID(Integer isRecommendID) {
		this.isRecommendID = isRecommendID;
	}
	/**
	public String getIsRecommendName() {
		return isRecommendName;
	}
	public void setIsRecommendName(String isRecommendName) {
		this.isRecommendName = isRecommendName;
	}*/
	public Integer getIsTopID() {
		return isTopID;
	}
	public void setIsTopID(Integer isTopID) {
		this.isTopID = isTopID;
	}
	/**
	public String getIsTopName() {
		return isTopName;
	}
	public void setIsTopName(String isTopName) {
		this.isTopName = isTopName;
	}*/
	public Integer getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(Integer categoryID) {
		this.categoryID = categoryID;
	}
	
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	
	public boolean isHasVideo() {
		return hasVideo;
	}
	public void setHasVideo(boolean hasVideo) {
		this.hasVideo = hasVideo;
	}
	public String getVideoUrl() {
		return videoUrl;
	}
	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}
	public String getVideoImageUrl() {
		return videoImageUrl;
	}
	public void setVideoImageUrl(String videoImageUrl) {
		this.videoImageUrl = videoImageUrl;
	}
	

	
}