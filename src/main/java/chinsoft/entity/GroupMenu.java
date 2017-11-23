package chinsoft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GroupMenu implements java.io.Serializable {
	@JsonProperty
	private Integer ID;
	private String menuIDs;
	
	public Integer getID() {
		return this.ID;
	}

	public void setID(Integer ID) {
		this.ID = ID;
	}

	public String getMenuIDs() {
		return menuIDs;
	}

	public void setMenuIDs(String menuIDs) {
		this.menuIDs = menuIDs;
	}
}