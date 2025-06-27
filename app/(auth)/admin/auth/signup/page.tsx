'use client';

import FacebookIcon from '@/components/icons/FacebookIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { Button, Divider, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    router.push('/admin/auth/email-confirmation');
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-lg bg-white pt-12 px-12 pb-8 rounded-md">
        <div className="flex flex-col items-center justify-between">
          <h1>Create an Account</h1>
          <div className="flex items-center gap-2 mt-2 mb-8">
            <p className="text-primary">Have an Account?</p>
            <Link href="/admin/auth/login">Sign In</Link>
          </div>
        </div>
        <Form layout="vertical" autoComplete="off" onFinish={handleSignup}>
          <Form.Item label="Full Name" name="fullName">
            <Input placeholder="Enter Full Name" className="custom-input" />
          </Form.Item>
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
              Create Account
            </Button>
          </Form.Item>
        </Form>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-primary">By creating an account, you agree to our</p>
          <Link href="#">Terms of Service</Link>
        </div>
        <Divider />
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary">Or create an account using:</p>
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
