package chinsoft.util;

/**
 * 分页数据对象
 * @author xutao
 * @version V1.0 创建时间：2017/11/22 20:02
 *          Copyright 2017 by 言午工作室
 */
public class PagingData {

    private long count;

    private int pageSize;

    private int page;

    private Object data;

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
