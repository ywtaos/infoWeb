package chinsoft.util;

import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author xutao
 * @version V1.0 创建时间：2017/11/21 23:14
 *          Copyright 2017 by 言午工作室
 */
public class DEncrypt {

  public static String  md5(String str){
      String newstr="";
      try {
          MessageDigest md5=MessageDigest.getInstance("MD5");
          BASE64Encoder base64en = new BASE64Encoder();
          newstr=base64en.encode(md5.digest(str.getBytes("utf-8")));
      } catch (NoSuchAlgorithmException e) {
          e.printStackTrace();
      } catch (UnsupportedEncodingException e) {
          e.printStackTrace();

      }
      return newstr;
  }

}
