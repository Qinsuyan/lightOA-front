import ResourceTree from '@/components/ResourceTree';
import { role } from '@/entities/role';
import { callProTableData } from '@/service';
import { getRoleList } from '@/service/role';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useRef } from 'react';

const Roles: React.FC = () => {
  const cols: ProColumnType<role>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入角色名称',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入角色描述',
          },
        ],
      },
    },
    {
      title: '权限',
      dataIndex: 'resources',
      hideInSearch: true,
      render:(_,r) => {
        return <ResourceTree readonly checked={r.resources}/>
      }
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 200,
      render: (text, record) => [
        <Button icon={<EditOutlined />} type="link" key="edit">
          编辑
        </Button>,
        <Button icon={<DeleteOutlined />} type="link" danger key="delete">
          删除
        </Button>,
      ],
    },
  ];
  const table = useRef<ActionType>();
  const { allResources, refreshAllResources } = useModel('resource');
  useEffect(() => {
    refreshAllResources();
  }, []);
  return (
    <>
      <ProTable
        size="large"
        columns={cols}
        options={false}
        search={{
          optionRender: () => [
            <Button icon={<PlusCircleOutlined />} type="primary">
              新增角色
            </Button>,
          ],
        }}
        rowKey={'id'}
        request={callProTableData(getRoleList)}
        pagination={{ pageSize: 10 }}
        actionRef={table}
      />
    </>
  );
};
export default Roles;
