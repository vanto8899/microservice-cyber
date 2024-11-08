"use client";

import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { login } from "../apis/fetchAPI";

export default function AuthenSignIn() {
  const [found, setFound] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    //console.log('Received values of form: ', values);
    const { email, password } = values;

    login({ email, password }).then((result) => {
      console.log(result); // api tra ve
      localStorage.setItem("USER_TOKEN", result);
    });
  };
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img src="./img/logo.png" alt="logo" width={150} />
      <Card style={{ width: "400px" }}>
        <h2 className="font-[500] text-2xl">Sign in</h2>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <span className="font-[500]">Email</span>
          <Form.Item
            name="email"
            className="mb-3"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <span className="font-[500]">Password</span>
          <Form.Item
            name="password"
            className="mb-3"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button className="w-full bg-[#ffd814]" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <p>
          By continuing, you agree to Amazon's{" "}
          <Link className="font-[500]" href={"/"}>
            Conditions of Use
          </Link>{" "}
          and{" "}
          <Link className="font-[500]" href={"/"}>
            Privacy Notice
          </Link>
          .
        </p>
        <button
          onClick={() => {
            setFound(!found);
          }}
        >
          {found ? <CaretDownOutlined /> : <CaretRightOutlined />}Need help?
        </button>
        {found && (
          <ul>
            <li>
              <Link href={"/"}>Forgot your password?</Link>
            </li>
            <li>
              <Link href={"/"}>Other issues with Sign-In</Link>
            </li>
          </ul>
        )}
        <h3 className="font-bold text-md">Buying for work?</h3>
        <Link href={"/"}>Shop on Amazon Business</Link>
      </Card>
      <button className="bg-white py-2 w-[400px] mt-10 rounded-md">
        <Link href={"/signup"}>Create your Amazon account</Link>
      </button>
    </div>
  );
}
