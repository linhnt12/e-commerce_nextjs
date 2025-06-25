'use client';

import { getProductCategoriesOptions } from '@/helpers/admin/product-categories/getProductCategoriesOptions';
import { ProductCategory } from '@/types/ProductCategory';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, message, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductCategoryDetail() {
  const { slug } = useParams();
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);
  const [productCategoriesOptions, setProductCategoriesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [modal, modalContextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    try {
      modal.confirm({
        title: 'Delete Product Category',
        content: 'Are you sure you want to delete this product category?',
        onOk: async () => {
          const res = await fetch(`/api/product-categories/${slug}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            messageApi.open({
              type: 'success',
              content: 'Product category deleted successfully',
            });
            setTimeout(() => {
              router.push('/admin/product-categories');
            }, 1000);
          }
        },
        onCancel: () => {},
      });
    } catch (error) {
      console.error(error);
    }
  };

  const refetch = () => {
    fetch(`/api/product-categories/${slug}`)
      .then((res) => res.json())
      .then((data) => setProductCategory(data));

    getProductCategoriesOptions([slug as string]).then((options) => {
      setProductCategoriesOptions(options);
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {modalContextHolder}
      {messageContextHolder}

      <h1 className="mb-6">{productCategory?.title}</h1>

      <div className="flex items-center justify-end gap-6">
        <Link href={`/admin/product-categories/${productCategory?.slug}/edit`}>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </Link>

        <Button
          danger
          onClick={() => handleDelete(productCategory?.slug ?? '')}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </div>

      <Image src={productCategory?.thumbnail} alt={productCategory?.title} height={350} />

      <div className="flex items-center gap-4 mb-4 mt-6">
        <p className="font-bold">Description: </p>
        <p>{productCategory?.description}</p>
      </div>

      <div className="flex items-center gap-4 mb-4 mb-4">
        <p className="font-bold">Parent Category: </p>
        <p>
          {productCategoriesOptions.find((option) => option.value === productCategory?.parent_id)
            ?.label || 'No parent category'}
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Status: </p>
        <p>
          <Tag color={productCategory?.status === 'active' ? 'green' : 'red'}>
            {productCategory?.status === 'active' ? 'Active' : 'Inactive'}
          </Tag>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Created At: </p>
        <p>{dayjs(productCategory?.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
      </div>

      <div className="flex items-center gap-4 mb-12">
        <p className="font-bold">Updated At: </p>
        <p>{dayjs(productCategory?.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
      </div>
    </div>
  );
}
