import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { tw } from "twind";

//  const password = values.password;
//  // console.log("明文：" + password);
//  const s4 = new (window as any).SM4Util();
//  //设置密钥
//  s4.secretKey = SECRET_KEY;
//  // console.log("密钥:" + s4.secretKey);
//  //ECB加密
//  const enPassword = s4.encryptData_ECB(password);

const Login = () => {
  const [form] = Form.useForm();
  const click = async () => {
    const valids = await form.validateFields();

    const navigate = useNavigate();
    navigate("/");
  };
  return (
    <div
      className={tw`w-full h-full flex flex-col justify-center items-center`}
    >
      <div>
        <h2 className={tw`text-center mb-2`}>登录系统</h2>
        <Form form={form}>
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
  );
};

export default Login;
