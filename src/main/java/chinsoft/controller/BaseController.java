package chinsoft.controller;


import chinsoft.util.Data;
import chinsoft.util.EntityHelper;
import chinsoft.util.LogPrinter;
import chinsoft.util.Utility;
import com.alibaba.fastjson.JSON;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BaseController {
	
	protected String getParameter(String formData ,String strParameter){
		String strValue = "";
		String  strFormData = Utility.toUtf8(formData);
		 LogPrinter.info(">>>>>>>>>>>>>>>>>>>>>>>>>>"+formData);
		 LogPrinter.info("<<<<<<<<<<<<<<<<<<<<<<<<<<"+strFormData);

		 Data jsonFormData  = JSON.parseObject(formData,Data.class);
		 if(strFormData.contains("formData")){
			 jsonFormData = JSON.parseObject(String.valueOf(jsonFormData.get("formData")),Data.class);
		 }
		LogPrinter.info(">>>>>>>>>>>>>>>>>>>>>>"+jsonFormData.toString());
		List keyList = new ArrayList<String>();
		   String[] keys = jsonFormData.getKeys();
	        for(String key:keys){
	        	keyList.add(key);
	        }
	        if(keyList.contains(strParameter)){
	    	  strValue = jsonFormData.getString(strParameter);
	      }else{
	    	  strValue="";
	      }
		return strValue;
		
	}

	
	protected void updateEntityFromFormData(Object obj, String formData){
		String strFormData =Utility.toUtf8(formData);

		Data jsonFormData  = JSON.parseObject(formData,Data.class);
		if(strFormData.contains("formData")){
			jsonFormData = JSON.parseObject(String.valueOf(jsonFormData.get("formData")),Data.class);
		}
		
		EntityHelper.updateEntityFromFormData(obj, jsonFormData);
	}
	 public static String replacer(String urlString) {
	     
	      try {
	    	  urlString = urlString.replaceAll("%(?![0-9a-fA-F]{2})", "%25");
	    	  urlString = urlString.replaceAll("\\+", "%2B");
	    	  urlString = URLDecoder.decode(urlString, "utf-8");
	      } catch (Exception e) {
	         e.printStackTrace();
	      }
	      return urlString;
	   }
	
}
