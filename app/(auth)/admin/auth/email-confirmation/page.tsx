'use client';

import { Button, Divider, Form, Input } from 'antd';
import Link from 'next/link';

export default function EmailConfirmationPage() {
  return (
    <div className="w-full max-w-lg bg-white pt-12 px-12 pb-8 rounded-md">
      <div className="flex flex-col items-center justify-between">
        <h1>Confirm Email</h1>
        <div className="flex items-center gap-2 mt-2 mb-8">
          <p className="text-primary">Check your email and enter confirmation code</p>
        </div>
      </div>
      <Form layout="vertical">
        <Form.Item label="Confirmation Code" name="confirmationCode">
          <Input placeholder="Enter Code" className="custom-input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full custom-button">
            Confirm Email
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <div className="flex flex-col items-center justify-center">
        <p className="text-primary">Haven&apos;t received your code?</p>
        <div className="flex flex-col items-center gap-4 mt-6 w-full">
          <Link
            href="/admin/auth/login"
            className="border border-gray-300 rounded-md w-full p-2 text-center flex items-center justify-center gap-2"
          >
            Resend Code
          </Link>
        </div>
      </div>
    </div>
  );
}
