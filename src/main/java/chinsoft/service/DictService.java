package chinsoft.service;

import chinsoft.dao.DictDao;
import chinsoft.entity.Dict;
import chinsoft.util.LogPrinter;
import chinsoft.util.ResourceHelper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author xutao
 * @version V1.0 创建时间：2017/11/22 20:36
 *          Copyright 2017 by 言午工作室
 */
@Service
public class DictService {


    @Resource
    private  DictDao dictDao;

    @Resource
    private CLangService cLangService;

    private static List<Dict> allDicts = null;
    private static List<Dict> allDictsSortByID = null;
    private static ArrayList allDictIDs = null;
    private static String LangCodeSequenceNo = "";
    private static String LangCodeSequenceID = "";


    public  Dict getDictByID(Integer nDictID) {

        Dict dict = null;
        if( nDictID == null ||nDictID <= 0){
            return null;
        }

        try{
            int nIndex = Collections.binarySearch(getAllDictIDs(), nDictID);
            dict = getAllDictsSortByID().get(nIndex);
            dict.setParentName(getDictNameByID(dict.getParentID()));
        }catch(Exception e){
            //LogPrinter.info("getdictbyid:"+  e.getMessage());
        }
        if(dict != null){
            return (Dict)dict.clone();
        }else{
            return null;
        }
    }



    public  String getDictNameByID(Integer nDictID) {
        try{
            if(nDictID != null && nDictID > 0){
                String name = ResourceHelper.getValue("Dict_" + nDictID);
                if(StringUtils.isEmpty(name)){
                    Dict d = getDictFromDB(nDictID);
                    LogPrinter.info("miss:" + d.getID());
                    if(d != null){
                        name = d.getName();
                    }
                }
                return name;
            }
            return "";
        }catch(Exception err){
            return "";
        }
    }

    public   Dict getDictFromDB(int nDictID) {
        return dictDao.findById( nDictID);
    }

    private  List<Dict> getAllDictsSortByID(){
        if (allDictsSortByID == null) {
            allDictsSortByID =dictDao.findAllByClazz();
        }
        try{
            String v = cLangService.getCurrentLangID();
            if(!LangCodeSequenceID.equals(v)){
                for(Dict dict : allDictsSortByID){
                    String strName = getDictNameByID(dict.getID());
                    if(StringUtils.isNotEmpty(strName)){
                        dict.setName(strName);
                    }
                }
                LangCodeSequenceID= v;
            }
        }catch(Exception err){
            //LogPrinter.info("lang exception");
        }

        return allDictsSortByID;
    }

    private  ArrayList getAllDictIDs(){
        if(allDictIDs == null){
            allDictIDs = new ArrayList();
            List<Dict> allDictsSortByIDs = getAllDictsSortByID();
            for(Dict dict:allDictsSortByIDs){
                DictService.allDictIDs.add(dict.getID());
            }
            //Collections.sort(DictManager.allDictIDs);
        }
        return allDictIDs;
    }
}
