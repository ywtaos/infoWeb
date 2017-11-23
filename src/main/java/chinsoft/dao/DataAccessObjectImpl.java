package chinsoft.dao;

import chinsoft.util.DaoUtil;
import chinsoft.util.LogPrinter;
import org.hibernate.*;
import org.hibernate.Query;
import org.springframework.orm.hibernate5.SessionFactoryUtils;

import javax.annotation.Resource;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 数据接入公共类
 * @author xutao
 * @version V1.0 创建时间：2017/11/20 21:38
 *          Copyright 2017 by 言午工作室
 */
public class DataAccessObjectImpl<T> implements DataAccessObject<T> {

    private Class<T> clazz;

    @Resource
    private SessionFactory sessionFactory;

    public DataAccessObjectImpl() {
        super();
        this.clazz = null;
        Class c = getClass();
        Type t = c.getGenericSuperclass();
        if (t instanceof ParameterizedType) {
            Type[] p = ((ParameterizedType) t).getActualTypeArguments();
            this.clazz = (Class<T>) p[0];
        }
    }

    @Override
    public Serializable save(T object) {
        return this.sessionFactory.getCurrentSession().save(object);
    }

    @Override
    public void update(T object) {
         this.sessionFactory.getCurrentSession().update(object);
    }

    @Override
    public void saveOrUpdate(T object) {
        this.sessionFactory.getCurrentSession().saveOrUpdate(object);
    }

    @Override
    public void delete(T object) {
        this.sessionFactory.getCurrentSession().delete(object);
    }



    @Override
    public <T> T findById(Serializable id) {
        return (T) this.sessionFactory.getCurrentSession().get(clazz,id);
    }

    @Override
    public <T> T loadById(Serializable id) {
        return (T) sessionFactory.getCurrentSession().load(clazz, id);
    }

    @Override
    public <T> T findByProperty(String propertyName, Object value) {
        if (propertyName != null && value != null) {
            String clazzName = clazz.getSimpleName();
            StringBuffer stringBuffer = new StringBuffer("select obj from ");
            stringBuffer.append(clazzName).append(" obj");
            stringBuffer.append(" where obj.").append(propertyName).append("=:value");
            Query query = sessionFactory.getCurrentSession().createQuery(stringBuffer.toString()).setParameter("value", value);
            return (T) query.uniqueResult();
        }
        return null;
    }


    @Override
    public <T> T findByEntity(T object) throws IllegalAccessException {
        Map<String, Object> map = DaoUtil.getBeanPropertiesAndValues(object);
        //转换map为属性名数组和值数组
        List<Object[]> mapList = DaoUtil.changeMapToArray(map);
        String[] propertyNames = (String[]) mapList.get(0);
        Object[] values = (Object[]) mapList.get(1);
        //组装HQL
        StringBuffer stringBuffer = new StringBuffer("select obj from ").append(object.getClass().getSimpleName());
        DaoUtil.fillParameters(stringBuffer, propertyNames);
        //填充参数值
        Query query = DaoUtil.fillValues(sessionFactory, stringBuffer, propertyNames, values);
        //返回链表
        return (T) query.uniqueResult();
    }

    @Override
    public void flushANDclear() {
        sessionFactory.getCurrentSession().flush();
        sessionFactory.getCurrentSession().clear();
    }

    @Override
    public void clean() {
        sessionFactory.getCurrentSession().clear();
    }

    @Override
    public void flush() {
        sessionFactory.getCurrentSession().flush();
    }

    @Override
    public <T> List<T> findAll() {
             return sessionFactory.getCurrentSession().createQuery("from " + clazz.getSimpleName() + " obj").list();
    }

    @Override
    public <T> List<T> findAllByClazz() {

        Criteria criteria =sessionFactory.getCurrentSession().createCriteria(clazz);
        List<T> list = criteria.list();
        return list;
    }

    @Override
    public <T> List<T> findAllByPage(String propertyName, boolean desc, Integer startRow, Integer pageSize) {
        String o=desc?"desc":"asc";
        return sessionFactory.getCurrentSession().createQuery("from "+clazz.getSimpleName()+" obj order by obj."+propertyName+" "+o).setFirstResult(startRow).setMaxResults(pageSize).list();
    }

    @Override
    public <T> List<T> findEntityByPage(int page, int pageSize) {
        Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(clazz);
        criteria.setFirstResult((page - 1) * pageSize);
        criteria.setMaxResults(pageSize);
        return criteria.list();
    }

    @Override
    public Long findAllCount() {
        return ((BigInteger) sessionFactory.getCurrentSession().createQuery("select count(0) from " + DaoUtil.getTableName(clazz)).uniqueResult()).longValue();
    }

    @Override
    public <T> List<T> findAllIterator() {
        int length = Integer.valueOf(this.findAllCount().toString());
        List<T> list = new ArrayList(length);
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("from " + clazz.getSimpleName() + " obj");
        Iterator iterator = query.iterate();
        while (iterator.hasNext()) {
            list.add((T) iterator.next());
        }
        return list;
    }

    @Override
    public <T> List<T> batchGetDataIteratorByHQL(String HQL, Integer startRow, Integer pageSize) {
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setFirstResult(startRow);
        query.setMaxResults(pageSize);
        Iterator iterator = query.iterate();
        List<T> list = new ArrayList(pageSize);
        while (iterator.hasNext()) {
            list.add((T) iterator.next());
        }
        return list;
    }

    @Override
    public ScrollableResults batchGetDataScrollByHQL(String HQL, Integer startRow, Integer pageSize) {
        Query query = sessionFactory.getCurrentSession().createQuery(HQL).setFirstResult(startRow).setMaxResults(pageSize);
        return query.scroll(ScrollMode.SCROLL_SENSITIVE);
    }

    @Override
    public ScrollableResults batchGetDataScrollBySQL(String SQL, Integer startRow, Integer pageSize) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(SQL).setFirstResult(startRow).setMaxResults(pageSize);
        ScrollableResults scrollableResults = query.scroll(ScrollMode.SCROLL_SENSITIVE);
        return scrollableResults;
    }

    @Override
    public Long findCountByHQL(String HQL) {
        if (HQL.contains("count")) {
            final int fromIndex = HQL.indexOf("from");
            final int commaIndex = HQL.indexOf(',');
            //如果from前面出现','，非法的HQL语句
            if (commaIndex!=-1&&fromIndex>commaIndex)
                return 0l;
            else return (Long) sessionFactory.getCurrentSession().createQuery(HQL).uniqueResult();
        } else {
            return 0l;
        }
    }

    @Override
    public <T> List<T> findListByHQL(String HQL,Map<String,String> params) {
        Query query = this.sessionFactory.openSession().createQuery(HQL);
        if(params!=null&params.size()>0){
            for(Map.Entry<String,String> entry:params.entrySet()){
                query.setString(entry.getKey(),entry.getValue());
            }
        }
        return  query.list();
    }

    @Override
    public <T> List<T> findListPageByHQL(String HQL, Map<String, String> params, int page, int pageSize) {
        Query query = this.sessionFactory.openSession().createQuery(HQL);
        if(params!=null&params.size()>0){
            for(Map.Entry<String,String> entry:params.entrySet()){
                query.setString(entry.getKey(),entry.getValue());
            }
        }
        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);
        return null;
    }

    @Override
    public Long findCountByHQL(String HQL, Map<String, String> params) {

        Query query = this.sessionFactory.openSession().createQuery(HQL);
        if(params!=null&params.size()>0){
            for(Map.Entry<String,String> entry:params.entrySet()){
                query.setString(entry.getKey(),entry.getValue());
            }
        }
        Long total =0L;
       if(query.uniqueResult()!=null){
           try {
               total=(Long) query.uniqueResult() ;
           }catch (Exception ex){
             ex.printStackTrace();
           }
       }
        return total;
    }

    @Override
    public Long findCountBySQL(String SQL) {
        if (SQL.contains("count")) {
            String sql = SQL.toLowerCase();
            final int fromIndex = sql.indexOf("from");
            final int commaIndex = sql.indexOf(',');
            //如果from前面出现','，非法的SQL语句
            if (commaIndex!=-1&&fromIndex>commaIndex) return 0l;
            else{
                BigInteger bg = (BigInteger) sessionFactory.getCurrentSession().createSQLQuery(SQL).uniqueResult();
                return bg.longValue();
            }

        } else {
            return 0l;
        }
    }

    @Override
    public <T> List<T> findByProperty(String[] propertyNames, Object[] values, Integer startRow, Integer pageSize, String sortColumn, boolean isDesc) {
        if (propertyNames.length != 0 && values.length != 0 && propertyNames.length == values.length) {
            String clazzName = clazz.getSimpleName();
            StringBuffer stringBuffer = new StringBuffer("select Object(obj) from ");
            stringBuffer.append(clazzName);
            Query query = DaoUtil.createConditionQuery(sessionFactory, stringBuffer, propertyNames, values, sortColumn, isDesc);
            //分页
            query.setFirstResult(startRow);
            query.setMaxResults(pageSize);
            //执行查询
            return query.list();
        }
        return null;
    }

    @Override
    public Long findByPropertyCount(String[] propertyNames, Object[] values) {
        if (propertyNames.length != 0 && values.length != 0 && propertyNames.length == values.length) {
            String clazzName = clazz.getSimpleName();
            StringBuffer stringBuffer = new StringBuffer("select count(0) from ");
            stringBuffer.append(clazzName);
            Query query = DaoUtil.createConditionQuery(sessionFactory, stringBuffer, propertyNames, values, "id", true);
            return (Long) query.uniqueResult();
        }
        return 0l;
    }

    @Override
    public <T> List<T> findByProperty(String propertyName, Object value, Integer startRow, Integer pageSize, String sortColumn, boolean isDesc) {
        String clazzName = clazz.getSimpleName();
        StringBuffer stringBuffer = new StringBuffer("select obj from ");
        stringBuffer.append(clazzName);
        Query query = DaoUtil.createSingleConditionHqlQuery(sessionFactory, stringBuffer, propertyName, value, sortColumn, isDesc);
        //分页
        query.setFirstResult(startRow);
        query.setMaxResults(pageSize);
        return query.list();
    }

    @Override
    public Long findByPropertyCount(String propertyName, Object value) {
        String clazzName = clazz.getSimpleName();
        StringBuffer stringBuffer = new StringBuffer("select count(0) from ");
        stringBuffer.append(clazzName);
        Query query = DaoUtil.createSingleConditionHqlQuery(sessionFactory, stringBuffer, propertyName, value, "id", true);
        return (Long) query.uniqueResult();
    }

    @Override
    public <T> List<T> findByProperty(T object, Integer startRow, Integer pageSize, String sortColumn, boolean isDesc) {
        List list = null;
        try {
            Map<String, Object> map = DaoUtil.getBeanPropertiesAndValues(object);
            //转换map为属性名数组和值数组
            List<Object[]> mapList = DaoUtil.changeMapToArray(map);
            String[] propertyNames = (String[]) mapList.get(0);
            Object[] values = (Object[]) mapList.get(1);
            //组装HQL
            StringBuffer stringBuffer = new StringBuffer("select obj from ").append(clazz.getSimpleName());
            DaoUtil.fillParameters(stringBuffer, propertyNames);
            //排序
            String desc = isDesc ? "asc" : "desc";
            stringBuffer.append("order by obj.").append(sortColumn).append(" " + desc);
            //填充参数值
            Query query = DaoUtil.fillValues(sessionFactory, stringBuffer, propertyNames, values);
            //返回链表
            list = query.list();
            return list;
        } catch (IllegalAccessException e) {
            LogPrinter.info("抛出异常方法：getBeanPropertiesAndValues！调用方法：SupperBaseDAOImp.findByProperty()");
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public Long findByPropertyCount(T object) {
        long count;
        try {
            Map<String, Object> map = DaoUtil.getBeanPropertiesAndValues(object);
            //转换map为属性名数组和值数组
            List<Object[]> mapList = DaoUtil.changeMapToArray(map);
            String[] propertyNames = (String[]) mapList.get(0);
            Object[] values = mapList.get(1);
            //组装HQL
            StringBuffer stringBuffer = new StringBuffer("select obj from ").append(clazz.getSimpleName());
            DaoUtil.fillParameters(stringBuffer, propertyNames);
            //填充参数值
            Query query = DaoUtil.fillValues(sessionFactory, stringBuffer, propertyNames, values);
            //返回链表
            count = (Long) query.uniqueResult();
            return count;
        } catch (IllegalAccessException e) {
            LogPrinter.info("抛出异常方法：getBeanPropertiesAndValues！调用方法：SupperBaseDAOImp.findByPropertyCount()");
            e.printStackTrace();
        }
        return 0l;
    }

    @Override
    public <T> List<T> findByProperty(Map<String, Object> map, Integer startRow, Integer pageSize, String sortColumn, boolean isDesc) {
        List<Object[]> mapList = DaoUtil.changeMapToArray(map);
        String[] propertyNames = (String[]) mapList.get(0);
        Object[] values = mapList.get(1);
        StringBuffer stringBuffer = new StringBuffer("select obj from ").append(clazz.getSimpleName());
        Query query = DaoUtil.createConditionQuery(sessionFactory, stringBuffer, propertyNames, values, sortColumn, isDesc);
        query.setFirstResult(startRow);
        query.setMaxResults(pageSize);
        return query.list();
    }

    @Override
    public Long findByPropertyCount(Map<String, Object> map) {
        List<Object[]> mapList = DaoUtil.changeMapToArray(map);
        String[] propertyNames = (String[]) mapList.get(0);
        Object[] values = mapList.get(1);
        StringBuffer stringBuffer = new StringBuffer("select count(0) from ").append(clazz.getSimpleName());
        Query query = DaoUtil.createConditionQuery(sessionFactory, stringBuffer, propertyNames, values, "id", true);
        return (Long) query.uniqueResult();
    }

    @Override
    public <T> List<T> findBySql(String sql, Object... values) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(sql).addEntity(clazz);
        for (int i = 0; i < values.length; i++) {
            query.setParameter(i, values[i]);
        }
        return query.list();
    }

    @Override
    public Long findBySqlCount(String sql, Object... values) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        for (int i = 0; i < values.length; i++) {
            query.setParameter(i, values[i]);
        }
        long count = ((BigInteger) query.uniqueResult()).longValue();
        return count;
    }

    @Override
    public <T> T findUniqueBySql(String sql, Object... values) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(sql).addEntity(clazz);
        for (int i = 0; i < values.length; i++) {
            query.setParameter(i, values[i]);
        }
        return (T) query.uniqueResult();
    }

    @Override
    public int batchUpdateOrDelete(String sql, Object... values) {
        //是否是合法的sql插入语句
        if (sql.indexOf("update") != -1) {
            Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
            for (int i = 0; i < values.length; i++) {
                query.setParameter(i, values[i]);
            }
            //设置忽略二级缓存
            query.setCacheMode(CacheMode.IGNORE);
            query.setCacheable(false);
            return query.executeUpdate();
        }
        return 0;
    }

    @Override
    public synchronized void batchInsertByHQL(List<T> objects, Integer size) {
        Session session = sessionFactory.getCurrentSession();
        Transaction tx = session.beginTransaction();
        //设置不二级缓存
        session.setCacheMode(CacheMode.IGNORE);
        int i = 0;
        final int length = objects.size();
        while (i < length) {
            session.save(objects.get(i));
            i++;
            if (i % size == 0) {
                session.flush();
                session.clear();
            }
        }
        tx.commit();
        session.close();
    }

    @Override
    public void batchInsertBySQL(String sql, List<Object[]> values) {
        final int length = values.get(0).length;
        if (length != 0) {
            try {
                StringBuffer stringBuffer = new StringBuffer(sql);
                final int size = values.size();
                //拼接values后的括号和参数位
                for (int i = 0; i < size; i++) {
                    stringBuffer.append("(");
                    for (int j = 0; j < length; j++) {
                        if (j == 0) stringBuffer.append("?");
                        if (j != 0) stringBuffer.append(",?");
                    }
                    if (i != size - 1) stringBuffer.append("),");
                    if (i == size - 1) stringBuffer.append(")");
                }
                //生成预处理SQL
                Connection conn = SessionFactoryUtils.getDataSource(sessionFactory).getConnection();
                PreparedStatement statement = conn.prepareStatement(stringBuffer.toString());
                int len = size;
                List<Object> list = new ArrayList(size * length);
                //获取所有参数
                int loopI = 0;
                while (len > loopI) {
                    Object[] objects = values.get(loopI);
                    for (int i = 0; i < length; i++) {
                        list.add(objects[i]);
                    }
                    loopI++;
                }
                int listLen = list.size();
                int index = 1;
                //填充参数
                while (index <= listLen) {
                    statement.setObject(index, list.get(index - 1));
                    index++;
                }
                statement.addBatch();
                statement.executeBatch();
            } catch (SQLException e) {
                e.printStackTrace();
                LogPrinter.info("##com.blog.dao.SupperBaseDAOImp.batchInsertBySQL(final String sql, final List<Object[]> values)方法出错##");
            } catch (IndexOutOfBoundsException e) {
                e.printStackTrace();
                LogPrinter.info("##com.blog.dao.SupperBaseDAOImp.batchInsertBySQL(final String sql, final List<Object[]> values)方法出错##");
            }
        }
    }


    /**
     * the table data with sql:"select d.code,d.value from dictionary d":
     * +------+--------+
     * | code | value  |
     * +------+--------+
     * | 001  | 四川   |
     * | 002  | 北京   |
     * | 001  | 四川   |
     * +------+--------+
     * eg:select new Map(d.code, d.value) from Dictionary d
     * result:[{0=001，1=四川},{0=002，1=北京},{0=001，1=四川}]
     * the result is List<Map>,one Map is one record,if not define the alias name,the map's key will be the column index and start with 0;
     * if you define a alias name ,it to be like this:
     * select new Map(d.value as value, d.code as code) from Dictionary d
     * [{value=四川, code=001},{value=北京, code=002},{value=四川, code=001}]
     * select new Map(d.value, d.code as code) from Dictionary d
     * [{0=四川, code=001},{0=北京, code=002},{0=四川, code=001}]
     * the map's key will be the alias name!
     *
     * @param HQL      HQL语句，如：select new Map(d.code as code, d.value as value) from Dictionary d;标明别名的‘as’是必须的
     * @param startRow 开始行数
     * @param pageSize 返回记录数
     * @return List<Map>
     */
    @Override
    public List<Map> getMapByHQL(final String HQL, final Integer startRow, final Integer pageSize) {
        Query query = sessionFactory.getCurrentSession().createQuery(HQL).setFirstResult(startRow).setMaxResults(pageSize);
        return query.list();
    }

    /**
     * table data:
     * +----+------+--------+
     * | id | code | value  |
     * +----+------+--------+
     * |  1 | 001  | 四川   |
     * |  2 | 002  | 北京   |
     * |  3 | 001  | 四川   |
     * +----+------+--------+
     * eg:select new List(d.code,d.value) from Dictionary d
     * result:[[001, 四川], [002, 北京], [001, 四川]]
     * the result is List<List>, one inner list is filled by column's value using one record
     *
     * @param HQL      HQL语句
     * @param startRow 开始行数
     * @param pageSize 返回记录数
     * @return List<List>
     */
    @Override
    public List<List> getListByHQL(final String HQL, final Integer startRow, final Integer pageSize) {
        Query query = sessionFactory.getCurrentSession().createQuery(HQL).setFirstResult(startRow).setMaxResults(pageSize);
        return query.list();
    }

    /**
     * 通过SQL语句查询记录，如果换addEntity使用query.addScalar(String,Hibernate.xxx)会产生List<Object[]>，且只返回addScalar声明过的字段
     * 此方法要求SQL语句中的返回列名称与实体属性名称匹配且等于或少于实体属性数量，此方法局限于：只能返回对应类本身的简单属性，不能返回类属性
     *
     * @param SQL sql语句
     * @return List<T>
     */
    @Override
    public <T> List<T> getListBySQL(final String SQL) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(SQL).addEntity(clazz);
        return query.list();
    }


    /**
     * 用SQL查询返回当前泛型对应实体对象，只返回一种类对应实体对象列表，包含子/关联实体
     * SQL需要视情况使用别名注入
     * 例如：
     * 一对一
     * createSQLQuery("select {login.*},{user.*} from user_login login,user_info user where user.loginid=login.id and loginid=1").addEntity("lgonin",UserLogin.class).addJoin("user","login.userInfo").list();
     * 一对多：
     * createSQLQuery("select {ar.*},{ca.*} from article_category ca,article_content ar where ar.category=ca.id").addEntity("ca",ArticleCategory.class).addJoin("ar","ca.articleContents").list();
     * 将会返回List<Object[]>,每个Object[]中有一个UserLogin(ArticleCategory)和一个UserInfo(ArticleContent)对象[其中ArticleCategory中的一对多关联的SET集合被初始化]，亦即是说关联会多产生被关联对象，Object[0]中的对象永远是addEntity中类的对象，List.size=记录的条数，即一对一时：多少条记录对应size；多对多时：多的一方记录条数对应size。
     *
     * @param addClazz List<List<Object>>，第一个inner List放返回的对象的别名和类，接着的放关联对象的别名和类
     * @param startRow 开始行数
     * @param pageSize 取记录数量 当此量大于0时才会调用Hibernate的分页功能
     * @return List
     */
    @Override
    public List findBySqlWithJoin(final String SQL, final List<List> addClazz, final Integer startRow, final Integer pageSize) {
        List ls = addClazz.get(0);
        Class claz = (Class) ls.get(1);
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(SQL).addEntity((String) ls.get(0), claz);
        //如果需要关联
        if(addClazz.size()>1) {
            List join = addClazz.subList(1, addClazz.size());
            for (int i = 0; i < join.size(); i++) {
                List sub = (List) join.get(i);
                query.addJoin((String) sub.get(0), (String) sub.get(1));
            }
        }
        if (startRow >= 0 && pageSize > 0) {
            query.setFirstResult(startRow);
            query.setMaxResults(pageSize);
        }
        return query.list();
    }



    /**
     * 查询多个实体，必须包含全字段
     * createSQLQuery("select {ar.*},{ca.*} from article_category ca,article_content ar where ar.id=ca.id").addEntity("ca",ArticleCategory.class).addEntity("ar",ArticleContents.class).list();
     * 将会返回List<Object[]>,每个Object[]中有一个ArticleCategory和一个ArticleContent对象[其中ArticleCategory中的一对多关联的SET集合被初始化]，亦即是说关联会多产生被关联对象，
     * Object[0]中的对象永远是第一个addEntity中类的对象，List.size=查询到的记录的条数。
     *
     * @param SQL      SQL语句，可包含分页信息，如果不要分页pageSize要设为<=0
     * @param alias    类名参数数组
     * @param startRow 记录开始行数
     * @param pageSize 获取记录数量
     * @return List
     */
    @Override
    public List findMoreBeanBySql(final String SQL, final List<List> alias, final Integer startRow, final Integer pageSize) {
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(SQL);
        //添加实体
        for (int i = 0; i < alias.size(); i++) {
            List sub = alias.get(i);
            query.addEntity((String) sub.get(0), (Class) sub.get(1));
        }
        if (startRow > 0 && pageSize > 0) {
            query.setFirstResult(startRow);
            query.setMaxResults(pageSize);
        }
        return query.list();
    }

    @Override
    public <T> List<T> findObjsByHQL(final String HQL, final Integer startRow, final Integer pageSize) {
        return sessionFactory.getCurrentSession().createQuery(HQL).setFirstResult(startRow).setMaxResults(pageSize).list();
    }
    @Override
    public <T>List<T> findEntityBySQL(final String sql,final Class<T> clas){
        return sessionFactory.getCurrentSession().createSQLQuery(sql).addEntity(clas).list();
    }


}
