'use client';

import FacebookIcon from '@/components/icons/FacebookIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { User } from '@/types/User';
import { Button, Divider, Form, Input, Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [modal, modalContextHolder] = Modal.useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: User) => {
    setIsLoading(true);
    const response = await fetch('/api/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (response.ok) {
      modal.success({
        title: 'Login successful',
      });
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } else {
      modal.error({
        title: 'Login failed. Please try again.',
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      {modalContextHolder}
      <div className="w-full max-w-lg bg-white pt-12 px-12 pb-8 rounded-md">
        <div className="flex flex-col items-center justify-between">
          <h1>Sign In</h1>
          <div className="flex items-center gap-2 mt-2 mb-8">
            <p className="text-primary">New to Our Product?</p>
            <Link href="/admin/auth/signup">Create an Account</Link>
          </div>
        </div>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter Email Address" className="custom-input" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter Password" className="custom-input" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full custom-button"
              loading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="flex items-center justify-center">
          <Link href="/admin/auth/forgot-password">Forgot your Password?</Link>
        </div>
        <Divider />
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary">Or login using:</p>
          <div className="flex flex-col items-center gap-4 mt-6 w-full">
            <Link
              href="/admin/login/google"
              className="border border-gray-300 rounded-md w-full p-2 text-center flex items-center justify-center gap-2"
            >
              <GoogleIcon />
              Continue with Google
            </Link>
            <Link
              href="/admin/login/facebook"
              className="border border-gray-300 rounded-md w-full p-2 text-center flex items-center justify-center gap-2"
            >
              <FacebookIcon />
              Continue with Facebook
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
