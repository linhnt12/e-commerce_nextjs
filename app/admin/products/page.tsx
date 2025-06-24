'use client';

import { Product } from '@/types/Product';
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Products List</h1>
        <Link href="/admin/products/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>
      <div className="flex justify-between items-center">
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
      <ul>
        {products.map((product: Product) => (
          <li key={product._id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
