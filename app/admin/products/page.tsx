'use client';

import { getProductCategoriesOptions } from '@/helpers/admin/product-categories/getProductCategoriesOptions';
import { formatCurrency } from '@/helpers/formatCurrency';
import { Product } from '@/types/Product';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [search, setSearch] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const sortOptions = [
    { label: 'Newest', value: 'createdAt-desc' },
    { label: 'Oldest', value: 'createdAt-asc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
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

  useEffect(() => {
    getProductCategoriesOptions().then((options) => {
      setProductCategories(options);
    });
  }, []);

  const columns: ColumnsType<Product> = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text: string, record: Product, index: number) => index + 1,
      width: 50,
      align: 'center',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string, record: Product) => (
        <Image
          src={record.thumbnail}
          alt={record.title}
          width={100}
          height={100}
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
      title: 'Category',
      dataIndex: 'product_category_id',
      key: 'product_category_id',
      align: 'center',
      render: (text: string, record: Product) =>
        productCategories.find((category) => category.value === record.product_category_id)
          ?.label || '-',
      width: 200,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string, record: Product) => formatCurrency(record.price || 0),
      align: 'center',
      width: 130,
    },
    {
      title: 'Discount',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (text: string, record: Product) => `${record.discountPercentage}%`,
      align: 'center',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
      width: 100,
      render: (text: string, record: Product) =>
        record.stock !== 0 ? record.stock : <Tag color="gray">Out of Stock</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text: string, record: Product) => (
        <Tag color={record.status === 'active' ? 'green' : 'red'}>{record.status}</Tag>
      ),
    },
    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
      align: 'center',
      render: (text: string, record: Product) =>
        record.feature === 'feature' ? (
          <CheckCircleOutlined style={{ color: 'green', fontSize: 16 }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red', fontSize: 16 }} />
        ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text: string, record: Product) => (
        <div className="flex justify-center gap-4">
          <Link href={`/admin/products/${record.slug}`}>
            <Button type="default" size="small" icon={<EyeOutlined />}>
              Detail
            </Button>
          </Link>
          <Link href={`/admin/products/${record.slug}/edit`}>
            <Button type="primary" size="small" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            type="default"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.slug ?? '')}
            danger
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

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = async (slug: string) => {
    modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product?',
      onOk: async () => {
        try {
          const response = await fetch(`/api/products/${slug}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            messageApi.open({
              type: 'success',
              content: 'Product deleted successfully',
            });
            refetch();
          } else {
            messageApi.open({
              type: 'error',
              content: 'Failed to delete product',
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
      content: `Are you sure you want to change the status of these products to ${status}?`,
      onOk: async () => {
        try {
          const response = await fetch(`/api/products`, {
            method: 'PUT',
            body: JSON.stringify({ ids: selectedRowKeys, status }),
          });
          if (response.ok) {
            messageApi.open({
              type: 'success',
              content: 'Products status changed successfully',
            });
            refetch();
          } else {
            messageApi.open({
              type: 'error',
              content: 'Failed to change products status',
            });
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleBulkDelete = async (selectedRowKeys: React.Key[]) => {
    modal.confirm({
      title: 'Delete Products',
      content: 'Are you sure you want to delete these products?',
      onOk: async () => {
        try {
          const response = await fetch(`/api/products`, {
            method: 'DELETE',
            body: JSON.stringify({ ids: selectedRowKeys }),
          });
          if (response.ok) {
            messageApi.open({
              type: 'success',
              content: 'Products deleted successfully',
            });
            refetch();
          } else {
            messageApi.open({
              type: 'error',
              content: 'Failed to delete products',
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
  }, [search, status, sort, order, startDate, endDate]);

  const refetch = async () => {
    const start = startDate ? startDate.format('YYYY-MM-DD') : '';
    const end = endDate ? endDate.add(1, 'day').format('YYYY-MM-DD') : '';

    const response = await fetch(
      `/api/products?search=${search}&status=${status}&sort=${sort}&order=${order}&startDate=${start}&endDate=${end}`
    );
    const data = await response.json();
    setProducts(data);
  };

  return (
    <div>
      {messageContextHolder}
      {modalContextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1>Products List</h1>
        <Link href="/admin/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
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
            style={{ width: '160px' }}
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
        columns={columns}
        dataSource={products}
        rowSelection={rowSelection}
        rowKey={(record) => record._id}
      />
    </div>
  );
}
