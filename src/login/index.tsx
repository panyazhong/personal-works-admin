import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { tw } from "twind";
import { css } from "twind/css";
import Logo from "@/assets/IMG_2914.png";
import { login } from "../api";

const Login = () => {
  const SECRET_KEY = "+Mz@%N.;Dhc|OxXZ";
  const [form] = Form.useForm();
  const click = async () => {
    try {
      const valids = await form.validateFields();
      const password = valids.password;
      // console.log("明文：" + password);
      const s4 = new (window as any).SM4Util();
      //设置密钥
      s4.secretKey = SECRET_KEY;
      // console.log("密钥:" + s4.secretKey);
      //ECB加密
      const enPassword = s4.encryptData_ECB(password);

      valids.password = enPassword;

      const res = await login(valids);

      localStorage.setItem("token", res);
      const navigate = useNavigate();
      navigate("/");
    } catch (error) {}
  };
  return (
    <div
      className={tw`w-full h-full flex flex-col justify-center items-center bg-[#191B1C]
        ${css`
          label {
            color: #fff !important;
          }
          .ant-form-item-control-input,
          input {
            border: none;
            border-radius: 0 !important;
            background: transparent;
            border-bottom: 1px solid #fff;
          }
          input {
            border-bottom: none;
            color: #fff !important;
          }
          .ant-input-password {
            background: transparent;
            border: none;
          }
          .ant-input-outlined:focus,
          .ant-input-outlined:hover {
            border: none;
            background: transparent;
            outline: none;
            box-shadow: none;
          }
          .ant-input-outlined.ant-input-status-error:not(.ant-input-disabled) {
            background: transparent;
            border: none;
          }
          .ant-input-outlined:focus-within {
            box-shadow: none;
          }
          .anticon {
            color: #fff !important;
          }
        `}
      `}
    >
      <div
        className={tw`w-full h-full flex justify-center items-center gap-[80px]`}
      >
        <div>
          <img src={Logo} className={tw`w-[500px]`} alt="" />
        </div>
        <div>
          <h2 className={tw`text-center mb-2 text-[#fff]`}>登录系统</h2>
          <Form form={form} layout="vertical">
            <Form.Item
              label="账号"
              name="account"
              rules={[
                {
                  required: true,
                  message: "输入账号",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "输入密码",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>

          <Button className={tw`w-full`} onClick={click}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
