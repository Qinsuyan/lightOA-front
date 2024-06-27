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

export const dateTimeRender = (t: number | string) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${fixZero(d.getMonth() + 1)}-${fixZero(d.getDate())} ${fixZero(
    d.getHours(),
  )}:${fixZero(d.getMinutes())}:${fixZero(d.getSeconds())}`;
};

const fixZero = (val: number) => {
  return val > 9 ? val : '0' + val;
};

export const getNode = (id: number, tree: any[]): any => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      return tree[i];
    }
  }
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].children?.length) {
      const node = getNode(id, tree[i].children);
      if (node) {
        return node;
      }
    }
  }
  return null;
};

type TreeNode = {
  id: number;
  children: TreeNode[];
} & any;
export const findSubTree = (tree: TreeNode[], idArray: number[]): TreeNode[] => {
  const idSet = new Set(idArray);
  const result: TreeNode[] = [];

  const traverse = (node: TreeNode): TreeNode | null => {
    if (idSet.has(node.id)) {
      const newNode: TreeNode = { ...node, children: [] };
      if (node.children?.length) {
        node.children.forEach((child: any) => {
          const subtree = traverse(child);
          if (subtree) {
            newNode.children.push(subtree);
          }
        });
      }

      return newNode;
    } else {
      const children: TreeNode[] = node.children
        ?.map((child: any) => traverse(child))
        ?.filter((child: null): child is TreeNode => child !== null);

      if (children?.length) {
        return { ...node, children };
      }
    }
    return null;
  };

  tree.forEach((node) => {
    const subtree = traverse(node);
    if (subtree) {
      result.push(subtree);
    }
  });

  return result;
};

export const findSubTreeIds = (tree: TreeNode[]): number[] => {
  const result: number[] = [];
  tree.forEach((node) => {
    //result.push(node.id);
    if (node.children?.length) {
      result.push(...findSubTreeIds(node.children));
    }else{
      result.push(node.id);
    }
  });
  return result;
};
