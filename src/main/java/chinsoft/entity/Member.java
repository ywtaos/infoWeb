package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import java.util.List;


public class Member implements java.io.Serializable {
	@JsonProperty
	private String ID;
	private String password;
	private String username;
	private Integer receiveMaxOrdenNumber;
	private Integer groupID;
	private String groupName;
	private Integer statusID;
	private String statusName;
	private Date registDate;
	private Date lastLoginDate;
	private String clientIP;
	private String mobile;
	private String tel;
	private String email;
	private String company;
	private String imageUrl;
	private String imageID;
	private Integer isRecommendID;
	private String isRecommendName;
	private Integer isAttentioned;
	//private String attentionCount;
	private String parentMemberID;
	private String parentMemberName;
	private String name;
	private String address;
	private String description;	
	private String spaceID;
	private String spaceName;
	private List<Member> spaceArtists;
	private String artists;
	private String airPort;
	
	private Integer attentionCount;
	private Integer fanCount;
	private Integer shareCount;
	private Integer informationCount;
	private Integer attitudeCount;
	private Integer commentCount;
	private Integer count;
	private String recommendProductID;
	private String 	recommendProductName;
	private String recommendProductImgUrl;
	private boolean isAttention;
	private boolean isInvite;
	
	private Integer typeID;
	private String typeName;
	private String openTime;
     
	
	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Integer getTypeID() {
		return typeID;
	}

	public void setTypeID(Integer typeID) {
		this.typeID = typeID;
	}

	public String getOpenTime() {
		return openTime;
	}

	public void setOpenTime(String openTime) {
		this.openTime = openTime;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public void setInvite(boolean isInvite) {
		this.isInvite = isInvite;
	}

	public boolean isInvite() {
		return isInvite;
	}

	public void setIsInvite(boolean isInvite) {
		this.isInvite = isInvite;
	}

	public boolean getIsAttention() {
		return isAttention;
	}

	public void setIsAttention(boolean isAttention) {
		this.isAttention = isAttention;
	}

	public Integer getAttitudeCount() {
		return attitudeCount;
	}

	public void setAttitudeCount(Integer attitudeCount) {
		this.attitudeCount = attitudeCount;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	
	public String getRecommendProductName() {
		return recommendProductName;
	}

	public void setRecommendProductName(String recommendProductName) {
		this.recommendProductName = recommendProductName;
	}

	public String getRecommendProductImgUrl() {
		return recommendProductImgUrl;
	}

	public void setRecommendProductImgUrl(String recommendProductImgUrl) {
		this.recommendProductImgUrl = recommendProductImgUrl;
	}

	public String getRecommendProductID() {
		return recommendProductID;
	}

	public void setRecommendProductID(String recommendProductID) {
		this.recommendProductID = recommendProductID;
	}
	public String getArtists() {
		return artists;
	}
	

	public void setArtists(String artists) {
		this.artists = artists;
	}

	
	private Long memberProductCount;



	public Long getMemberProductCount() {
		return memberProductCount;
	}

	public void setMemberProductCount(Long memberProductCount) {
		this.memberProductCount = memberProductCount;
	}



	public Integer getIsRecommendID() {
		return isRecommendID;
	}

	public void setIsRecommendID(Integer isRecommendID) {
		this.isRecommendID = isRecommendID;
	}

	public String getIsRecommendName() {
		return isRecommendName;
	}

	public void setIsRecommendName(String isRecommendName) {
		this.isRecommendName = isRecommendName;
	}

	public String getImageID() {
		return imageID;
	}

	public void setImageID(String imageID) {
		this.imageID = imageID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getGroupID() {
		return groupID;
	}

	public void setGroupID(Integer groupID) {
		this.groupID = groupID;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Integer getStatusID() {
		return statusID;
	}

	public void setStatusID(Integer statusID) {
		this.statusID = statusID;
	}

	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

	public Date getRegistDate() {
		return registDate;
	}

	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}

	public Date getLastLoginDate() {
		return lastLoginDate;
	}

	public void setLastLoginDate(Date lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}

	public String getClientIP() {
		return clientIP;
	}

	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getParentMemberID() {
		return parentMemberID;
	}

	public void setParentMemberID(String parentMemberID) {
		this.parentMemberID = parentMemberID;
	}

	public String getParentMemberName() {
		return parentMemberName;
	}

	public void setParentMemberName(String parentMemberName) {
		this.parentMemberName = parentMemberName;
	}

	public Integer getReceiveMaxOrdenNumber() {
		return receiveMaxOrdenNumber;
	}

	public void setReceiveMaxOrdenNumber(Integer receiveMaxOrdenNumber) {
		this.receiveMaxOrdenNumber = receiveMaxOrdenNumber;
	}

	public String getSpaceID() {
		return spaceID;
	}

	public void setSpaceID(String spaceID) {
		this.spaceID = spaceID;
	}

	public String getSpaceName() {
		return spaceName;
	}

	public void setSpaceName(String spaceName) {
		this.spaceName = spaceName;
	}

	public List<Member> getSpaceArtists() {
		return spaceArtists;
	}

	public void setSpaceArtists(List<Member> spaceArtists) {
		this.spaceArtists = spaceArtists;
	}



	public Integer getIsAttentioned() {
		return isAttentioned;
	}

	public void setIsAttentioned(Integer isAttentioned) {
		this.isAttentioned = isAttentioned;
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

	public Integer getInformationCount() {
		return informationCount;
	}

	public void setInformationCount(Integer informationCount) {
		this.informationCount = informationCount;
	}

	public void setAttention(boolean isAttention) {
		this.isAttention = isAttention;
	}

	public Integer getAttentionCount() {
		return attentionCount;
	}

	public void setAttentionCount(Integer attentionCount) {
		this.attentionCount = attentionCount;
	}

	public String getAirPort() {
		return airPort;
	}

	public void setAirPort(String airPort) {
		this.airPort = airPort;
	}



	

}