import sendHttp from "../utils/http";

// 请求权限列表
let userLogin = (data:object) =>sendHttp(`login`,'post',data)

export {
    userLogin
}