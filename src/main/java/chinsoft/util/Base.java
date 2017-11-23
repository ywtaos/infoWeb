package chinsoft.util;



import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;



/**
 *
 *
 * @author xutao
 * @version V1.0 创建时间：2017-11-20
 *          Copyright 2017 by 言午工作室
 */
public class Base {
	
	 private final static String ENCODE = "UTF-8"; 
	   public static String getURLDecoderString(String str) {
	        String result = "";
	        if (null == str) {
	            return "";
	        }
	        try {
	            result = java.net.URLDecoder.decode(str, ENCODE);
	        } catch (UnsupportedEncodingException e) {
	            e.printStackTrace();
	        }
	        return result;
	    }

	
	public String getViewName(HttpServletRequest req, String viewName) {

		String userAgent = req.getHeader("USER-AGENT").toLowerCase();

		if (isMobile(userAgent)) {
			viewName += "m";
		}
		return viewName;
	}

	

	static String phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i" + "|windows (phone|ce)|blackberry"
			+ "|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp" + "|laystation portable)|nokia|fennec|htc[-_]"
			+ "|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";
	static String tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser" + "|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";

	static Pattern phonePat = Pattern.compile(phoneReg, Pattern.CASE_INSENSITIVE);
	static Pattern tablePat = Pattern.compile(tableReg, Pattern.CASE_INSENSITIVE);

	public static boolean isMobile(String userAgent) {
		if (null == userAgent) {
			userAgent = "";
		}
		Matcher matcherPhone = phonePat.matcher(userAgent);
		Matcher matcherTable = tablePat.matcher(userAgent);
		if (matcherPhone.find() || matcherTable.find()) {
			return true;
		} else {
			return false;
		}
	}
	
	private Pattern pattern;
	   private Matcher matcher;

	   private static final String IMAGE_PATTERN =
	                "([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)";
	   
	   public boolean validate(final String image){
		   pattern = Pattern.compile(IMAGE_PATTERN);
			  matcher = pattern.matcher(image);
			  return matcher.matches();

		   }
	  
	   private final static double PI = 3.14159265358979323; // 圆周率
	    private final static double R = 6371229; // 地球的半径
		    public static double getDistance(double lng1, double lat1, double lng2,double lat2) {
		    	
		        double x, y, distance;
		        x = (lng2 - lng1) * PI * R
		                * Math.cos(((lat1 + lat2) / 2) * PI / 180) / 180;
		        y = (lat2 - lat1) * PI * R / 180;
		        distance = Math.hypot(x, y);
		        return distance;
		    }
		

}
