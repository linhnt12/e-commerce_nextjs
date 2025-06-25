import { Breadcrumb } from 'antd';
import Link from 'next/link';

const breadcrumbItems = [
  { path: '/admin', title: 'Home' },
  { path: '/admin/dashboard', title: 'Dashboard' },
  { path: '/admin/products', title: 'Products' },
  { path: '/admin/products/create', title: 'Add Product' },
  { path: '/admin/product-categories', title: 'Product Categories' },
  { path: '/admin/product-categories/create', title: 'Add Product Category' },
  { path: '/admin/orders', title: 'Orders' },
  { path: '/admin/users', title: 'Users' },
];

const getTitle = (pathname: string) => {
  const pathSnippets = pathname.split('/').filter((i) => i);
  const lastPart = pathSnippets[pathSnippets.length - 1] || '';

  return decodeURIComponent(lastPart)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getBreadcrumbItems = (pathname: string) => {
  const pathSnippets = pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    const found = breadcrumbItems.find((item) => item.path === url);

    if (found) {
      return {
        title: found.title,
        href: url,
      };
    }

    const lastPart = pathSnippets[index];
    return {
      title: getTitle(lastPart),
      href: url,
    };
  });

  return extraBreadcrumbItems;
};

export default function BreadcrumbDashboard({ pathname }: { pathname: string }) {
  const extraBreadcrumbItems = getBreadcrumbItems(pathname);

  return (
    <Breadcrumb
      style={{ margin: '16px', fontWeight: 'bold' }}
      items={extraBreadcrumbItems.map((item) => ({
        title: <Link href={item.href}>{item.title}</Link>,
      }))}
    />
  );
}
