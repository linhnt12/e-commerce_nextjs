'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function Users() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Users List</h1>
        <Link href="/admin/users/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Add User
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
    </div>
  );
}
