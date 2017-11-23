package chinsoft.service;

import chinsoft.dao.CLangDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 语言包
 * @author xutao
 * @version V1.0 创建时间：2017/11/22 21:52
 *          Copyright 2017 by 言午工作室
 */
@Service
public class CLangService {

    @Resource
    private CLangDao cLangDao;

    public String getCurrentLangID(){
        return "zh";
    }
}
