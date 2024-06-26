import { resource } from '@/entities/role';
import { useModel } from '@umijs/max';
import { Button, Modal, Spin, Tree } from 'antd';
import { useState } from 'react';

const ResourceTree: React.FC<{ checked: resource[]; readonly?: boolean }> = (props) => {
  const { allResources } = useModel('resource');
  const [showResourceModal, setShowResourceModal] = useState(false);
  const handleViewResources = () => {
    setShowResourceModal(true);
  };
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
            treeData={props.checked !== null ? props.checked : [allResources as any]}
          />
        </Modal>
      </>
    );
  }
  return (
    <Tree
      fieldNames={{ title: 'name', key: 'id' }}
      treeData={
        props.readonly
          ? [allResources as any]
          : props.checked !== null
          ? props.checked
          : [allResources]
      }
    />
  );
};
export default ResourceTree;
