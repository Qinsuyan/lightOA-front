import ResourceTree from '@/components/ResourceTree';
import { role } from '@/entities/role';
import { callProTableData } from '@/service';
import { addRole, editRole, getRoleList } from '@/service/role';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

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
      render: (_, r) => {
        return <ResourceTree readonly value={r.resources} />;
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择角色权限',
          },
        ],
      },
      renderFormItem(schema, config, form, action) {
        return <ResourceTree />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 200,
      render: (text, record) => [
        <Button
          onClick={() => handleEditRole(record)}
          icon={<EditOutlined />}
          type="link"
          key="edit"
        >
          编辑
        </Button>,
        <Button icon={<DeleteOutlined />} type="link" danger key="delete">
          删除
        </Button>,
      ],
    },
  ];
  const table = useRef<ActionType>();
  const form = useRef<ProFormInstance>();
  const { refreshAllResources } = useModel('resource');
  useEffect(() => {
    refreshAllResources();
  }, []);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleModalTitle, setRoleModalTitle] = useState('');
  const roleModalType = useRef<'add' | 'edit'>('add');
  const editingRoleId = useRef<number>();
  const handleAddRole = () => {
    setRoleModalTitle('新增角色');
    form.current?.setFieldsValue({
      name: '',
      desc: '',
      resources: [],
    });
    setShowRoleModal(true);
  };
  const handleEditRole = (role: role) => {
    editingRoleId.current = role.id;
    setRoleModalTitle('编辑角色');
    form.current?.setFieldsValue({
      name: role.name,
      desc: role.desc,
      resources: role.resources,
    });
    roleModalType.current = 'edit';
    setShowRoleModal(true);
  };
  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
  };
  const handleConfirmRoleModal = () => {
    form.current?.validateFields().then((values) => {
      if (roleModalType.current === 'add') {
        addRole(values).then(() => {
          table.current?.reload();
          handleCloseRoleModal();
        });
      } else {
        editRole({ ...values, id: editingRoleId.current! }).then(() => {
          table.current?.reload();
          handleCloseRoleModal();
        });
      }
    });
  };
  return (
    <>
      <ProTable
        size="large"
        columns={cols}
        options={false}
        search={{
          optionRender: (search, props, dom) => [
            ...dom,
            <Button onClick={handleAddRole} key="add" icon={<PlusCircleOutlined />} type="primary">
              新增角色
            </Button>,
          ],
        }}
        rowKey={'id'}
        request={callProTableData(getRoleList)}
        pagination={{ pageSize: 10 }}
        actionRef={table}
      />
      <Modal
        onCancel={handleCloseRoleModal}
        open={showRoleModal}
        title={roleModalTitle}
        onOk={handleConfirmRoleModal}
        forceRender
      >
        <ProTable
          size="large"
          columns={cols}
          rowKey={'id'}
          type="form"
          formRef={form}
          form={{ layout: 'horizontal', submitter: false }}
        />
      </Modal>
    </>
  );
};
export default Roles;
