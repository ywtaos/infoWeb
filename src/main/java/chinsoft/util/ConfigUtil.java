package chinsoft.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigUtil {

	public static String getConfValue(String fileName,String key){
		Properties prop = new Properties();
		InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName);
		try {
			prop.load(in);
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
		return prop.getProperty(key);
	}

	public static String getConfValueByKey(String key){

		return getConfValue("cfg.properties",key);
	}
	public static void main(String[] args){
		String value=getConfValueByKey("FTP.IPAddress");
		System.out.println(value);
	}
}
