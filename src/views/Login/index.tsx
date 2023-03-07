import { Button, Form, Input ,message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { userLogin } from '../../api/login';
import './index.less'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        userLogin(values).then(res=>{
            console.log(res)
            if(res.data.meta.status === 200){
                messageApi.open({
                    type: 'success',
                    content: res.data.meta.msg,
                });
                localStorage.setItem('token',res.data.data.token)
                navigate('/index/home')
            }else{
                messageApi.open({
                    type: 'error',
                    content: res.data.meta.msg,
                });
            }
        })
    };
    return (
        <div className='login'>
            <div className='login_form'>
                <p className='login_header'>用户登录</p>
                <div>
                    {contextHolder}
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
