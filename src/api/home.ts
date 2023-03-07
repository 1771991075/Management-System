import sendHttp from "../utils/http";

// 请求权限列表
let homeList = () =>sendHttp(`rights/:type`,'get')

export {
    homeList
}