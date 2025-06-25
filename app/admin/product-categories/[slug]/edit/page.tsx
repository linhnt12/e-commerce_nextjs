'use client';

import { getProductCategoriesOptions } from '@/helpers/admin/product-categories/getProductCategoriesOptions';
import { ProductCategory } from '@/types/ProductCategory';
import { Button, Form, FormProps, Input, Modal, Radio, Select, message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type FieldType = {
  title?: string;
  description?: string;
  thumbnail?: string;
  status?: string;
  parent_id?: string;
};

export default function ProductCategoryDetail() {
  const { slug } = useParams();
  const [form] = Form.useForm();
  const [modal, modalContextHolder] = Modal.useModal();
  const [productCategoriesOptions, setProductCategoriesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    getProductCategoriesOptions([slug as string]).then((options) => {
      setProductCategoriesOptions([{ label: 'None', value: '' }, ...options]);
    });
    refetch();
  }, [slug]);

  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    modal.confirm({
      title: 'Update Product Category',
      content: 'Are you sure you want to update this product category?',
      onOk: async () => {
        const response = await fetch(`/api/product-categories/${slug}`, {
          method: 'PUT',
          body: JSON.stringify(values),
        });
        await response.json();

        router.push(`/admin/product-categories`);
        message.success('Product category updated successfully');
      },
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const refetch = () => {
    fetch(`/api/product-categories/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        form.setFieldsValue(data);
        setProductCategory(data);
      });
  };

  return (
    <div>
      {modalContextHolder}
      <h1 className="mb-6">{productCategory?.title}</h1>

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

        <Form.Item<FieldType> label="Parent Category" name="parent_id">
          <Select options={productCategoriesOptions} placeholder="Select Parent Category" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input.TextArea rows={4} />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
