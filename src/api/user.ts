import sendHttp from "../utils/http";

//请求用户列表
let getUserList = (pagenum:string,pagesize:string,query?:string) =>sendHttp(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=`,'get')

//获取所有的用户数量
let getUserCount = () =>sendHttp(`roles`,'get')

export {
    getUserList,
    getUserCount
}