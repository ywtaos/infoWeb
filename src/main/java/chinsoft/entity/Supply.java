package chinsoft.entity;
import java.util.Date;

public class Supply implements java.io.Serializable{
    private String ID;

    private String code;

    private String name;

    private String licenseNumber;

    private String licenseTerm;

    private String tax;

    private String validityOfLicense;

    private String pubMemberID;

    private Date pubDate;
    
	public String getID() {
		return this.ID;
	}
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getCode() {
		return this.code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLicenseNumber() {
		return this.licenseNumber;
	}
	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	public String getLicenseTerm() {
		return this.licenseTerm;
	}
	public void setLicenseTerm(String licenseTerm) {
		this.licenseTerm = licenseTerm;
	}
	public String getTax() {
		return this.tax;
	}
	public void setTax(String tax) {
		this.tax = tax;
	}
	public String getValidityOfLicense() {
		return this.validityOfLicense;
	}
	public void setValidityOfLicense(String validityOfLicense) {
		this.validityOfLicense = validityOfLicense;
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
