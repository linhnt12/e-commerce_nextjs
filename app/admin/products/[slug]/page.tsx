'use client';

import { getProductCategoriesOptions } from '@/helpers/admin/product-categories/getProductCategoriesOptions';
import { formatCurrency } from '@/helpers/formatCurrency';
import { Product } from '@/types/Product';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, message, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [modal, modalContextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [productCategoriesOptions, setProductCategoriesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleDelete = async (slug: string) => {
    modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product?',
      onOk: async () => {
        await fetch(`/api/products/${slug}`, {
          method: 'DELETE',
        });
        messageApi.success('Product deleted successfully');
        setTimeout(() => {
          router.push(`/admin/products`);
        }, 1000);
      },
    });
  };

  const refetch = () => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  };

  useEffect(() => {
    getProductCategoriesOptions([slug as string]).then((options) => {
      setProductCategoriesOptions(options);
    });
    refetch();
  }, [slug]);

  return (
    <div>
      {messageContextHolder}
      {modalContextHolder}
      <h1 className="mb-6">{product?.title}</h1>

      <div className="flex items-center justify-end gap-6">
        <Link href={`/admin/products/${product?.slug}/edit`}>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </Link>

        <Button danger onClick={() => handleDelete(product?.slug ?? '')} icon={<DeleteOutlined />}>
          Delete
        </Button>
      </div>

      <Image src={product?.thumbnail} alt={product?.title} height={350} />

      <p className="font-bold">Description: </p>
      <p>{product?.description}</p>

      <div className="flex items-center gap-4 mb-4 mt-4">
        <p className="font-bold">Product Category: </p>
        <p>
          {productCategoriesOptions.find((option) => option.value === product?.product_category_id)
            ?.label || 'No product category'}
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Price: </p>
        <p>{formatCurrency(product?.price ?? 0)}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Discount Percentage: </p>
        <p>{product?.discountPercentage}%</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Stock: </p>
        <p>{product?.stock}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Feature: </p>
        <p>{product?.feature}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Status: </p>
        <p>
          <Tag color={product?.status === 'active' ? 'green' : 'red'}>
            {product?.status === 'active' ? 'Active' : 'Inactive'}
          </Tag>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Created At: </p>
        <p>{dayjs(product?.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Updated At: </p>
        <p>{dayjs(product?.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
      </div>
    </div>
  );
}
