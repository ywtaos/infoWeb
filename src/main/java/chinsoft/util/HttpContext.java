package chinsoft.util;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 設置接口
 * @author xutao
 * @version V1.0 创建时间：2017/11/21 22:34
 *          Copyright 2017 by 言午工作室
 */
public class HttpContext {

    private static HttpServletRequest request;

      static{
          request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
      }

    public static void setSessionValue(String key,Object obj,HttpServletRequest request){
        HttpSession session=request.getSession();
        session.setAttribute(key,obj);
    }

    public static HttpServletRequest getRequest(){

        return request;
    }

    public static Object getSessionValue(String key){
        HttpSession session=request.getSession();
       return session.getAttribute(key);
    }

    public static  void  signOut(HttpServletRequest request){
        HttpSession session=request.getSession();
        session.invalidate();
    }
}
