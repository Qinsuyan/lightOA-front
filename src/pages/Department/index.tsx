import { department } from '@/entities/department';
import { callProTableData } from '@/service';
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartmentList,
} from '@/service/department';
import { dateTimeRender } from '@/utils';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProColumnType, ProFormInstance, ProTable, ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
const Department: React.FC = () => {
  const cols: ProColumnType<department>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入部门名称',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入部门描述',
          },
        ],
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      hideInForm: true,
      renderText: (val) => dateTimeRender(val),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 200,
      render: (text, record) => [
        <Button
          onClick={() => handleEditDepartment(record)}
          icon={<EditOutlined />}
          type="link"
          key="edit"
        >
          编辑
        </Button>,
        <Button
          onClick={() => handleDeleteDepartment(record)}
          icon={<DeleteOutlined />}
          type="link"
          danger
          key="delete"
        >
          删除
        </Button>,
      ],
    },
  ];
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const form = useRef<ProFormInstance>();
  const table = useRef<ActionType>();
  const modalType = useRef<'add' | 'edit'>('add');
  const departmentId = useRef<number>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const handleAddDepartment = () => {
    modalType.current = 'add';
    setModalTitle('新增部门');
    form.current?.setFieldsValue({
      name: '',
      description: '',
    });
    setShowDepartmentModal(true);
  };
  const handleCloseDepartmentModal = () => {
    setShowDepartmentModal(false);
  };
  const handleFinishDepartmentModal = () => {
    form.current?.validateFields().then((res: department) => {
      if (modalType.current === 'add') {
        //新增
        addDepartment(res).then(() => {
          table.current?.reload();
          handleCloseDepartmentModal();
        });
      } else {
        //编辑
        editDepartment({ ...res, id: departmentId.current! }).then(() => {
          table.current?.reload();
          handleCloseDepartmentModal();
        });
      }
    });
  };
  const handleEditDepartment = (dep: department) => {
    modalType.current = 'edit';
    departmentId.current = dep.id;
    setModalTitle('编辑部门');
    form.current?.setFieldsValue({
      name: dep.name,
      description: dep.description,
    });
    setShowDepartmentModal(true);
  };
  const handleDeleteDepartment = (dep: department) => {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除部门【${dep.name}】吗？`,
      onOk: () => {
        deleteDepartment(dep.id).then(() => {
          table.current?.reload();
        });
      },
    });
  };
  return (
    <>
      <ProTable
        size="large"
        columns={cols}
        options={false}
        search={{
          optionRender: () => [
            <Button onClick={handleAddDepartment} icon={<PlusCircleOutlined />} type="primary">
              新增部门
            </Button>,
          ],
        }}
        rowKey={'id'}
        request={callProTableData(getDepartmentList)}
        pagination={{ pageSize: 10 }}
        actionRef={table}
      />
      <Modal
        forceRender
        title={modalTitle}
        open={showDepartmentModal}
        onCancel={handleCloseDepartmentModal}
        onOk={handleFinishDepartmentModal}
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
export default Department;
