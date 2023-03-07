import { Input, Space, Button, Table, Switch, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUserList, getUserCount } from '../../api/user'
import { FormOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less'
const { Search } = Input;
const onSearch = (value: string) => console.log(value);


interface DataType {
    key: string;
    id: number;
    username: string;
    email: string;
    mobile: number;
    role_name: string;
    mg_state: boolean;
}

const columns: ColumnsType<DataType> = [
    {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id',
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
        render: () => <Switch defaultChecked onChange={() => { }} />
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary" size='small' icon={<FormOutlined />}>编辑</Button>
                <Button size='small' type="primary" danger icon={<DeleteOutlined />}>删除</Button>
                <Button type="primary" size='small' icon={<SettingOutlined />}>分配角色</Button>
            </Space>
        ),
    },
];

export default function User() {
    //当前用户列表
    let [data, setData] = useState([])
    //总共条数
    let [count,setCount] = useState(0)
    //当前页数和当前每页数量
    let [page,setPage] = useState(1)
    let [pageSize,setPageSize] = useState(5)

    //点击切换页码
    let onChange:PaginationProps['onChange'] = (page,pageSize) => {
        console.log(page,pageSize);
        
        setPage(page)
        setPageSize(pageSize)
    };

    useEffect(() => {
        getUserList(page, pageSize).then(res => {
            setData(res.data.data.users)
        })
        getUserCount().then(res=>{
            setCount(res.data.data.length)
        })
    }, [page,pageSize])
    return (
        <div className='user'>
            <div className='user_header'>
                <Search placeholder="请输入内容" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" className='adduserbtn'>添加用户</Button>
            </div>
            <div>
                <Table columns={columns} dataSource={data} sticky={true} bordered={true} pagination={false}/>
                <Pagination showQuickJumper defaultPageSize={pageSize} defaultCurrent={page} current={page} total={count} pageSizeOptions={[5,10,20,50]} onChange={onChange} showSizeChanger={true} />
            </div>
        </div>
    )
}
