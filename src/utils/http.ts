import axios from 'axios'
axios.defaults.baseURL = "http://106.12.150.223:8090/api/private/v1/";
axios.defaults.timeout = 6000;

//请求拦截
axios.interceptors.request.use((config)=>{
    // 设置请求头授权字段 每次请求都会携带该字段授权
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
})

//响应拦截
axios.interceptors.response.use((res:any)=>{
    if(res.data.code===401){
        setTimeout(()=>{
            window.location.href = '#/login'
        },1000)
        return { code:401 }
    }
    return res
})

let sendHttp = (url:string,method:string,data?:any,header?:any)=>{
    return axios({
        url,
        method,
        params:method==='get'? data : null,
        data:method==='post'? data : null,
        headers:header
    })
} 

export default sendHttp;