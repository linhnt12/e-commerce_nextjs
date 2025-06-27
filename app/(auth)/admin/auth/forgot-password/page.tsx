'use client';

import { Button, Divider, Form, Input } from 'antd';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-lg bg-white pt-12 px-12 pb-8 rounded-md">
      <div className="flex flex-col items-center justify-between">
        <h1>Password Reset</h1>
        <div className="flex items-center gap-2 mt-2 mb-8">
          <p className="text-primary">We will send you an email to reset your password</p>
        </div>
      </div>
      <Form layout="vertical">
        <Form.Item label="Email" name="email">
          <Input placeholder="Enter Email Address" className="custom-input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full custom-button">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <div className="flex flex-col items-center justify-center">
        <p className="text-primary">Remembered your Password?</p>
        <div className="flex flex-col items-center gap-4 mt-6 w-full">
          <Link
            href="/admin/auth/login"
            className="border border-gray-300 rounded-md w-full p-2 text-center flex items-center justify-center gap-2"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
