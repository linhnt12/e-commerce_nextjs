'use client';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, InputNumber, Radio, Select, Upload } from 'antd';

type FieldType = {
  title?: string;
  description?: string;
  thumbnail?: string;
  status?: string;
  product_category_id?: string;
  price?: number;
  discountPercentage?: number;
  stock?: number;
  feature?: string;
};

export default function CreateProduct() {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1 className="mb-6">Add Product</h1>
      <Form name="basic" onFinish={onFinish} layout="vertical" onFinishFailed={onFinishFailed}>
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Product Category" name="product_category_id">
          <Select options={[]} placeholder="Select Product Category" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input your price!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'}
            parser={(value) => value?.replace(/[^\d]/g, '') || ''}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Discount Percentage"
          name="discountPercentage"
          rules={[{ required: true, message: 'Please input your discount percentage!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace('%', '') || ''}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please input your stock!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
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

        <Form.Item<FieldType> label="Feature" name="feature">
          <Radio.Group
            options={[
              { label: 'Feature', value: 'feature' },
              { label: 'Not Feature', value: 'not_feature' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
