'use client';

import { getProductCategoriesOptions } from '@/helpers/admin/product-categories/getProductCategoriesOptions';
import { Product } from '@/types/Product';
import { Button, Form, FormProps, Input, InputNumber, message, Modal, Radio, Select } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function EditProduct() {
  const { slug } = useParams();
  const [form] = Form.useForm();
  const [productCategoriesOptions, setProductCategoriesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [messageApi, messageContextHolder] = message.useMessage();
  const router = useRouter();
  const [modal, modalContextHolder] = Modal.useModal();
  useEffect(() => {
    getProductCategoriesOptions([slug as string]).then((options) => {
      setProductCategoriesOptions(options);
    });
    refetch();
  }, [slug]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    modal.confirm({
      title: 'Update Product',
      content: 'Are you sure you want to update this product?',
      onOk: async () => {
        const response = await fetch(`/api/products/${slug}`, {
          method: 'PUT',
          body: JSON.stringify(values),
        });
        const data = await response.json();
        setProduct(data);
        messageApi.success('Product updated successfully');
        setTimeout(() => {
          router.push(`/admin/products`);
        }, 1000);
      },
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const refetch = () => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        form.setFieldsValue(data);
        setProduct(data);
      });
  };

  return (
    <div>
      {messageContextHolder}
      {modalContextHolder}
      <h1 className="mb-6">{product?.title}</h1>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Product Category" name="product_category_id">
          <Select options={productCategoriesOptions} placeholder="Select Product Category" />
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
          {/* <Upload>
            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
          </Upload> */}
          <Input />
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
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
