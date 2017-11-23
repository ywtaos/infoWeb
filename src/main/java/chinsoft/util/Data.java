package chinsoft.util;

import java.util.*;

/**
 * 通用對象
 */
public class Data extends HashMap<String, Object> {
	/**
	 * 编号
	 */
	private static final long serialVersionUID = -8787152550673424086L;


	public Data(){
		
	}
	public Data(Map<String, Object> map){
		this.putAll(map);
	}
	public Object get(String key) {
		Object value = super.get(key);
		return value;
	}

	public Object get(String key, Object def) {
		Object value = get(key);
		return value == null ? def : value;
	}

	public String[] getKeys() {
		return getKeys(false);
	}

	public String[] getKeys(boolean sort) {
		String[] result = keySet().toArray(new String[0]);
		if (sort)
			Arrays.sort(result);
		return result;
	}

	public String getString(String key) {
		Object result = get(key);
		return result == null ? null : result.toString();
	}

	public String getString(String key, String def) {
		String result = getString(key);
		return result == null ? def : result;
	}

	public int getInt(String key) {
		return getInt(key, 0);
	}

	public int getInt(String key, int def) {
		Object result = get(key);
		if (null == result) {
			return def;
		}
		return Integer.parseInt(result.toString());
	}

	public double getDouble(String key) {
		return getDouble(key, 0.0d);
	}

	public double getDouble(String key, double def) {
		Object result = get(key);
		if (null == result) {
			return def;
		}
		return Double.parseDouble(result.toString());
	}

	public boolean getBoolean(String key) {
		return getBoolean(key, false);
	}

	public boolean getBoolean(String key, boolean def) {
		Object result = get(key);
		if (null == result) {
			return def;
		}
		return Boolean.valueOf(result.toString());
	}

	public String toString() {
		StringBuffer str = new StringBuffer();
		str.append("{");
		Iterator<Entry<String, Object>> it = entrySet().iterator();
		while (it.hasNext()) {
			Entry<?, ?> entity = (Entry<?, ?>) it.next();
			Object key = entity.getKey();
			Object value = entity.getValue();
			str.append("\"" + key + "\":");

			if (value == null)
				str.append("\"\"");
			else if (((value instanceof Map)) || ((value instanceof List)))
				str.append(value);
			else {
				str.append("\"" + value + "\"");
			}
			if(it.hasNext()){
				str.append(",");
			}
		}
		str.append("}");
		return str.toString();
	}
}
