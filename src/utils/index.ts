/**
 * 从localStorage中获取对象。
 * @param key 用于在localStorage中检索对象的键名。
 * @returns 如果找到键名对应的价值，并且该价值能够成功解析为JSON，则返回解析后的对象。如果无法解析或键不存在，则返回null。
 */
export const getObjectFromLocalStorage = <T = any>(key: string) => {
  // 尝试从localStorage获取指定键名的值
  const value = localStorage.getItem(key);
  if (value) {
    try {
      // 尝试将值从JSON字符串解析为对象
      return JSON.parse(value) as T;
    } catch {
      // 如果解析失败，返回null
      return null;
    }
  }
  // 如果键不存在，直接返回null
  return null;
};

export const setObjectToLocalStorage = (key: string, value: any) => {
  // 将对象转换为JSON字符串
  const jsonValue = JSON.stringify(value);
  // 将JSON字符串存储到localStorage中
  localStorage.setItem(key, jsonValue);
};
