package chinsoft.util;

import java.io.UnsupportedEncodingException;

/**
 * 返回值
 * @author xutao
 * @version V1.0 创建时间：2017/11/21 18:39
 *          Copyright 2017 by 言午工作室
 */
public class Utility {

    /**
     * 返回成功
     */
    public static String RESULT_VALUE_OK="OK";


    public static String SessionKey_CurrentMember="SessionKey_CurrentMember";
    /**
     * 转换成UTF-8的字符串
     * @param str
     * @return
     */
    public static String toUtf8(String str){
        String newStr=str;
        try {
            newStr =  new String(str.getBytes("UTF-8"),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return newStr;
    }

    /**
     * 安全转发数字
     * @param intStr
     * @return
     */
    public static int toSafeInt(String intStr){
        int ret=-1;
        try {
            ret=Integer.parseInt(intStr);
        }catch (Exception ex){

        }
        return  ret;
    }
}
