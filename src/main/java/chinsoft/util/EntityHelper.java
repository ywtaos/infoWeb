package chinsoft.util;

import java.lang.reflect.Field;

/**
 * 實體操作工具類
 * @author xutao
 * @version V1.0 创建时间：2017/11/21 22:10
 *          Copyright 2017 by 言午工作室
 */
public class EntityHelper {

    public static void updateEntityFromFormData(Object obj,Data strFormData){
        if(strFormData!=null&&strFormData.getKeys()!=null&&strFormData.getKeys().length>0){
            try {
                String[] keys= strFormData.getKeys();
               for(String key:keys){
                    Field field= obj.getClass().getDeclaredField(key);
                    if(field!=null){
                      Object val=  strFormData.get(key);
                      if(val!=null){
                        field.set(key,val);
                      }
                    }
               }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
