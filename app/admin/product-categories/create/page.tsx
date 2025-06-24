'use client';
import { UploadOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Form, Input, message, Radio, Select, Upload } from 'antd';
import { useRouter } from 'next/navigation';

type FieldType = {
  title?: string;
  description?: string;
  thumbnail?: string;
  status?: string;
  parent_id?: string;
};

export default function CreateProductCategory() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const response = await fetch('/api/product-categories', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    await response.json();

    router.push(`/admin/product-categories`);
    message.success('Product category created successfully');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1 className="mb-6">Add Product Category</h1>
      <Form name="basic" onFinish={onFinish} layout="vertical" onFinishFailed={onFinishFailed}>
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Parent Category" name="parent_id">
          <Select options={[]} placeholder="Select Parent Category" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<FieldType> label="Thumbnail" name="thumbnail">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
          </Upload>
        </Form.Item>

        <Form.Item<FieldType>
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select your status!' }]}
        >
          <Radio.Group
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
