
package chinsoft.entity;
import java.util.Date;

public class Information
    {
        public String ID ;

        public String title ;

        public String img ;

        public String link ;

        public Date pubDate ;

        public String pubMemberID ;

        public Member pubMember ;

        public String pubMemberName ;

        public Integer categoryID ;

        public String categoryName ;

        public String content ;

        public String platformIDs ;

        public String platformNames ;

        public Integer statusID ;
        
        public Integer hotID;
        
        public String hotName;

		public String statusName ;
        public String attachmentIDs ;
        public String url ;
        
        public Integer isFocusID ;
        public String isFocusName ;
        
        public String getIsFocusName() {
			return isFocusName;
		}
		public void setIsFocusName(String isFocusName) {
			this.isFocusName = isFocusName;
		}
		public Integer getIsFocusID() {
			return isFocusID;
		}
		public void setIsFocusID(Integer isFocusID) {
			this.isFocusID = isFocusID;
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
		public String getImg() {
			return img;
		}
		public void setImg(String img) {
			this.img = img;
		}
		public String getLink() {
			return link;
		}
		public void setLink(String link) {
			this.link = link;
		}
		public Date getPubDate() {
			return pubDate;
		}
		public void setPubDate(Date pubDate) {
			this.pubDate = pubDate;
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
		public String getPubMemberName() {
			return pubMemberName;
		}
		public void setPubMemberName(String pubMemberName) {
			this.pubMemberName = pubMemberName;
		}
		public Integer getCategoryID() {
			return categoryID;
		}
		public void setCategoryID(Integer categoryID) {
			this.categoryID = categoryID;
		}
		public String getCategoryName() {
			return categoryName;
		}
		public void setCategoryName(String categoryName) {
			this.categoryName = categoryName;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public String getPlatformIDs() {
			return platformIDs;
		}
		public void setPlatformIDs(String platformIDs) {
			this.platformIDs = platformIDs;
		}
		public String getPlatformNames() {
			return platformNames;
		}
		public void setPlatformNames(String platformNames) {
			this.platformNames = platformNames;
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
		public String getAttachmentIDs() {
			return attachmentIDs;
		}
		public void setAttachmentIDs(String attachmentIDs) {
			this.attachmentIDs = attachmentIDs;
		}
		public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public boolean equals(Object obj){
			if(!(obj instanceof Dict))
				return false;
			Information infor = (Information)obj;
			return this.getID().equals(infor.getID());
		}

		@Override
		public Object clone(){
	        try {
				return super.clone();
			} catch (CloneNotSupportedException e) {
				e.printStackTrace();
				return null;
			}
	    }
}