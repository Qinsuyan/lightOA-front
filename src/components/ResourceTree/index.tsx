import { resource } from '@/entities/role';
import { findSubTree, findSubTreeIds } from '@/utils';
import { useModel } from '@umijs/max';
import { Button, Modal, Spin, Tree } from 'antd';
import { useEffect, useState } from 'react';

const ResourceTree: React.FC<{
  value?: resource[];
  readonly?: boolean;
  onChange?: (val: resource[]) => any;
}> = (props) => {
  const { allResources } = useModel('resource');
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const handleViewResources = () => {
    setShowResourceModal(true);
  };
  const handleCheck = (checkedKeys: any) => {
    const sub = findSubTree([allResources], checkedKeys);
    props.onChange?.(sub);
  };
  useEffect(() => {
    if (!props.readonly && props.value) {
      const keys = findSubTreeIds(props.value);
      setCheckedKeys(keys);
    }
  }, [props.value]);
  if (!allResources) {
    return <Spin />;
  }
  if (props.readonly) {
    return (
      <>
        <Button type="link" onClick={handleViewResources}>
          查看
        </Button>
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          okText="关闭"
          onOk={() => setShowResourceModal(false)}
          onCancel={() => setShowResourceModal(false)}
          open={showResourceModal}
        >
          <Tree
            defaultExpandAll
            fieldNames={{ title: 'name', key: 'id' }}
            treeData={props.value !== null ? props.value : [allResources as any]}
          />
        </Modal>
      </>
    );
  }
  return (
    <Tree
      fieldNames={{ title: 'name', key: 'id' }}
      checkable
      onCheck={handleCheck}
      checkedKeys={checkedKeys}
      treeData={
        !props.readonly
          ? [allResources as any]
          : props.value !== null
          ? props.value
          : [allResources]
      }
    />
  );
};
export default ResourceTree;
