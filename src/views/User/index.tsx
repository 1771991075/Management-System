import { Input, Space, Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import {getUserList,getUserCount} from '../../api/user'
import './index.less'
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

interface DataType {
    key: string;
    id:number;
    username: string;
    email:string;
    mobile: number;
    role_name:string;
    mg_state:boolean;
}

const columns: ColumnsType<DataType> = [
    {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
    },
    {
        title: '角色',
        dataIndex: 'role_name',
        key: 'role_name',
    },
    {
        title: '状态',
        dataIndex: 'mg_state',
        key: 'mg_state',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button>编辑</Button>
                <Button>删除</Button>
                <Button>分配角色</Button>
            </Space>
        ),
    },
];

let data: DataType[] = [];

export default function User() {

    useEffect(()=>{
        getUserList('1','5').then(res=>{
            console.log(res);
            data = res.data.data.users
            console.log(data);
            
        })
    },[])
    return (
        <div className='user'>
            <div className='user_header'>
                <Search placeholder="请输入内容" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" className='adduserbtn'>添加用户</Button>
            </div>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}
