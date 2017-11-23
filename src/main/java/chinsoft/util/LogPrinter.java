package chinsoft.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
/**
 * 打印实体类
 * @author xutao
 * @version V1.0 创建时间：2017/11/20 21:50
 *          Copyright 2017 by 言午工作室
 */
public class LogPrinter {

    private static Log LOGGER = LogFactory.getLog(LogPrinter.class);

    /**
     * 打印提示信息
     * @param info
     */
    public  static void info(String info){
        LOGGER.info(info);
    }


    /**
     * 打印錯誤信息
     * @param info
     */
    public  static void error(String info){
        LOGGER.error(info);
    }
}
