'use client';

import { getProductCategoriesOptions } from '@/helpers/admin/product-categories/getProductCategoriesOptions';
import { ProductCategory } from '@/types/ProductCategory';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Dropdown,
  Image,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductCategories() {
  const [productCategories, setProductCategories] = useState([]);
  const [productCategoriesOptions, setProductCategoriesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    getProductCategoriesOptions().then((options) => {
      setProductCategoriesOptions(options);
    });
  }, []);

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'createdAt-desc' },
    { label: 'Oldest', value: 'createdAt-asc' },
    { label: 'A-Z', value: 'title-asc' },
    { label: 'Z-A', value: 'title-desc' },
  ];

  const actionOptions = [
    {
      key: 'change-status',
      label: 'Change Status',
      children: [
        {
          key: 'change-status-active',
          label: 'Active',
        },
        {
          key: 'change-status-inactive',
          label: 'Inactive',
        },
      ],
    },
    {
      key: 'delete',
      label: 'Delete',
    },
  ];

  const columns: ColumnsType<ProductCategory> = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text: string, record: ProductCategory, index: number) => index + 1,
      width: 50,
      align: 'center',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string, record: ProductCategory) => (
        <Image
          src={record.thumbnail}
          alt={record.title}
          width={100}
          height={70}
          className="rounded-md object-cover"
        />
      ),
      width: 200,
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Parent Category',
      dataIndex: 'parent_id',
      key: 'parent_id',
      render: (text: string, record: ProductCategory) => {
        const parentCategory = productCategoriesOptions.find(
          (option) => option.value === record.parent_id
        );
        return parentCategory ? parentCategory.label : '';
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (text: string, record: ProductCategory) => (
        <Tag color={record.status === 'active' ? 'green' : 'red'}>
          {record.status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 300,
      align: 'center',
      render: (text: string, record: ProductCategory) => (
        <div className="flex justify-center gap-4">
          <Link href={`/admin/product-categories/${record.slug}`}>
            <Button type="default" size="small" icon={<EyeOutlined />}>
              Detail
            </Button>
          </Link>
          <Link href={`/admin/product-categories/${record.slug}/edit`}>
            <Button type="primary" size="small" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            danger
            size="small"
            onClick={() => handleDelete(record.slug ?? '')}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ProductCategory> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = async (slug: string) => {
    try {
      modal.confirm({
        title: 'Delete Product Category',
        content: 'Are you sure you want to delete this product category?',
        onOk: async () => {
          const res = await fetch(`/api/product-categories/${slug}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (res.ok) {
            messageApi.open({
              type: 'success',
              content: 'Product category deleted successfully',
            });
            refetch();
          } else {
            messageApi.open({
              type: 'error',
              content: data.message,
            });
          }
        },
        onCancel: () => {},
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBulkDelete = async (selectedRowKeys: React.Key[]) => {
    modal.confirm({
      title: 'Delete Product Categories',
      content: 'Are you sure you want to delete these product categories?',
      onOk: async () => {
        try {
          const response = await fetch(`/api/product-categories`, {
            method: 'DELETE',
            body: JSON.stringify({ ids: selectedRowKeys }),
          });
          if (response.ok) {
            messageApi.open({
              type: 'success',
              content: 'Product categories deleted successfully',
            });
            refetch();
          } else {
            messageApi.open({
              type: 'error',
              content: 'Failed to delete product categories',
            });
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleBulkChangeStatus = async (selectedRowKeys: React.Key[], status: string) => {
    modal.confirm({
      title: 'Change Status',
      content: `Are you sure you want to change the status of these product categories to ${status}?`,
      onOk: async () => {
        try {
          const response = await fetch(`/api/product-categories`, {
            method: 'PUT',
            body: JSON.stringify({ ids: selectedRowKeys, status }),
          });
          if (response.ok) {
            messageApi.open({
              type: 'success',
              content: 'Product categories status changed successfully',
            });
            refetch();
          } else {
            messageApi.open({
              type: 'error',
              content: 'Failed to change product categories status',
            });
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [status, search, sort, order, startDate, endDate]);

  const refetch = () => {
    const start = startDate ? startDate.format('YYYY-MM-DD') : '';
    const end = endDate ? endDate.add(1, 'day').format('YYYY-MM-DD') : '';

    fetch(
      `/api/product-categories?search=${search}&status=${status}&sort=${sort}&order=${order}&startDate=${start}&endDate=${end}`
    )
      .then((res) => res.json())
      .then((data) => setProductCategories(data));
  };

  return (
    <div>
      {modalContextHolder}
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1>Product Categories</h1>
        <Link href="/admin/product-categories/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Dropdown
            menu={{
              items: actionOptions,
              onClick: ({ key }) => {
                if (key === 'delete') {
                  handleBulkDelete(selectedRowKeys);
                } else if (key === 'change-status-active') {
                  handleBulkChangeStatus(selectedRowKeys, 'active');
                } else if (key === 'change-status-inactive') {
                  handleBulkChangeStatus(selectedRowKeys, 'inactive');
                }
              },
            }}
          >
            <Button type="primary" disabled={selectedRowKeys.length === 0}>
              Action <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Input.Search
            placeholder="Search"
            style={{ width: '220px' }}
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DatePicker.RangePicker
            style={{ width: '220px' }}
            placeholder={['Start Date', 'End Date']}
            onChange={(value) => {
              if (value) {
                setStartDate(value[0]);
                setEndDate(value[1]);
              } else {
                setStartDate(null);
                setEndDate(null);
              }
            }}
          />
          <Select
            placeholder="Status"
            style={{ width: '120px' }}
            options={statusOptions}
            defaultValue={statusOptions[0].value}
            onChange={(value) => setStatus(value)}
          />
          <Select
            placeholder="Sort by"
            style={{ width: '120px' }}
            options={sortOptions}
            defaultValue={sortOptions[0].value}
            onChange={(value) => {
              const [sort, order] = value.split('-');
              setSort(sort);
              setOrder(order);
            }}
          />
        </div>
      </div>
      <Table
        dataSource={productCategories}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record._id}
      />
    </div>
  );
}
