import ProductCategoriesIcon from '@/components/icons/ProductCategoriesIcon';
import {
  DashboardOutlined,
  ProductOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  key: string;
  path?: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    key: 'store',
    label: 'Store',
    icon: <ShopOutlined />,
    children: [
      {
        key: 'products',
        path: '/admin/products',
        label: 'Products',
        icon: <ProductOutlined />,
      },
      {
        key: 'product-categories',
        path: '/admin/product-categories',
        label: 'Product Categories',
        icon: <ProductCategoriesIcon />,
      },
      {
        key: 'orders',
        path: '/admin/orders',
        label: 'Orders',
        icon: <ShoppingOutlined />,
      },
    ],
  },
  {
    key: 'users',
    path: '/admin/users',
    label: 'Users',
    icon: <UserOutlined />,
  },
  {
    key: 'settings',
    path: '/admin/settings',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
];

export default function Sidenav() {
  const renderMenuItems = (
    items: MenuItem[]
  ): Array<{
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
    children?: Array<{
      key: string;
      icon: React.ReactNode;
      label: React.ReactNode;
    }>;
  }> =>
    items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      return {
        key: item.key,
        icon: item.icon,
        label: item.path ? <Link href={item.path}>{item.label}</Link> : item.label,
        children: hasChildren ? renderMenuItems(item.children!) : undefined,
      };
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="demo-logo-vertical flex justify-center items-center">
        <Image src="/images/logo.png" alt="logo" width={150} height={100} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={renderMenuItems(menuItems)}
      />
    </div>
  );
}
