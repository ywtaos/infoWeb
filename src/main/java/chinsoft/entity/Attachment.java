package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Attachment {
	@JsonProperty
	private String ID;
	private String fileName;
	private String fileNameInDisk;
	private String description;
	private String contentType;
	private Long fileLength;
	private Integer needWaterMark;
	private String memberID;
	private String hiddenID;	
	private String webUrl;
	private String videoImgID;
	

	public String getVideoImgID() {
		return videoImgID;
	}

	public void setVideoImgID(String videoImgID) {
		this.videoImgID = videoImgID;
	}

	public String getWebUrl() {
		return webUrl;
	}

	public void setWebUrl(String webUrl) {
		this.webUrl = webUrl;
	}

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		this.ID = iD;
	}
	public String getHiddenID() {
		return hiddenID;
	}

	public void setHiddenID(String hiddenID) {
		this.hiddenID = hiddenID;
	}
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileNameInDisk() {
		return fileNameInDisk;
	}

	public void setFileNameInDisk(String fileNameInDisk) {
		this.fileNameInDisk = fileNameInDisk;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public Long getFileLength() {
		return fileLength;
	}

	public void setFileLength(Long fileLength) {
		this.fileLength = fileLength;
	}

	public Integer getNeedWaterMark() {
		return needWaterMark;
	}

	public void setNeedWaterMark(Integer needWaterMark) {
		this.needWaterMark = needWaterMark;
	}

	public String getMemberID() {
		return memberID;
	}

	public void setMemberID(String memberID) {
		this.memberID = memberID;
	}	
}