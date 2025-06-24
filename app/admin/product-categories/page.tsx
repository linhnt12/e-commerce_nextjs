'use client';

import { ProductCategory } from '@/types/ProductCategory';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Image, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductCategories() {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    fetch('/api/product-categories')
      .then((res) => res.json())
      .then((data) => setProductCategories(data));
  }, []);

  const columns: ColumnsType<ProductCategory> = [
    {
      title: 'ID',
      dataIndex: 'index',
      key: 'index',
      render: (text: string, record: ProductCategory, index: number) => index + 1,
      width: 80,
      align: 'center',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string, record: ProductCategory) => (
        <Image src={record.thumbnail} alt={record.title} width={50} height={50} />
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 300,
      align: 'center',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Product Categories</h1>
        <Link href="/admin/product-categories/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Input.Search placeholder="Search" style={{ width: '300px' }} />
        <div className="flex items-center justify-end gap-4">
          <DatePicker.RangePicker
            style={{ width: '230px' }}
            defaultValue={[dayjs().subtract(1, 'month'), dayjs()]}
          />
          <Select placeholder="Status" style={{ width: '120px' }} options={[]} />
          <Select placeholder="Sort by" style={{ width: '120px' }} options={[]} />
        </div>
      </div>
      <Table dataSource={productCategories} columns={columns} />
    </div>
  );
}
