import ProductCategoriesIcon from '@/components/icons/ProductCategoriesIcon';
import {
  DashboardOutlined,
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: '/admin/products',
    title: 'Products',
    icon: <ProductOutlined />,
  },
  {
    path: '/admin/product-categories',
    title: 'Product Categories',
    icon: <ProductCategoriesIcon />,
  },
  {
    path: '/admin/orders',
    title: 'Orders',
    icon: <ShoppingOutlined />,
  },
  {
    path: '/admin/users',
    title: 'Users',
    icon: <UserOutlined />,
  },
];

export default function Sidenav() {
  return (
    <div className="flex flex-col gap-4">
      <div className="demo-logo-vertical">
        <Image src="/logo.png" alt="logo" width={100} height={48} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/admin/dashboard']}
        items={menuItems.map((item) => ({
          key: item.path,
          icon: item.icon,
          label: <Link href={item.path}>{item.title}</Link>,
        }))}
      />
    </div>
  );
}
