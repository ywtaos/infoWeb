
package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class Ad implements Serializable {
	@JsonProperty
	public String ID;
	public String code;
	public String description;
	public String imageID;
	public String imageName;
	public String visitUrl;
	public String content;
	public Integer width;
	public Integer height;
	public Integer sequenceNo;
	public String pubMemberID;
	public String memo;
	public String position;

	private String locationID;

	private Date fromDate;

	private Date toDate;

	public String getLocationID() {
		return locationID;
	}

	public void setLocationID(String locationID) {
		this.locationID = locationID;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageID() {
		return imageID;
	}

	public void setImageID(String imageUrl) {
		this.imageID = imageUrl;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageUrlName) {
		this.imageName = imageUrlName;
	}

	public String getVisitUrl() {
		return visitUrl;
	}

	public void setVisitUrl(String visitUrl) {
		this.visitUrl = visitUrl;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getSequenceNo() {
		return sequenceNo;
	}

	public void setSequenceNo(Integer sequenceNo) {
		this.sequenceNo = sequenceNo;
	}

	public String getPubMemberID() {
		return pubMemberID;
	}

	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}

	public boolean equals(Object obj) {
		if (!(obj instanceof Dict))
			return false;
		Ad ad = (Ad) obj;
		return this.getID().equals(ad.getID());
	}

	@Override
	public Object clone() {
		try {
			return super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			return null;
		}
	}

	public Ad(String iD, String code, String description, String imageUrl, String imageUrlName, String visitUrl,
			String content, Integer width, Integer height, Integer sequenceNo, String pubMemberID) {
		super();
		ID = iD;
		this.code = code;
		this.description = description;
		this.imageID = imageUrl;
		this.imageName = imageUrlName;
		this.visitUrl = visitUrl;
		this.content = content;
		this.width = width;
		this.height = height;
		this.sequenceNo = sequenceNo;
		this.pubMemberID = pubMemberID;
	}

	public Ad(String code, Integer width, Integer height, String description) {

		this.code = code;
		this.description = description;

		this.width = width;
		this.height = height;

	}

	public Ad() {
		super();
	}

}