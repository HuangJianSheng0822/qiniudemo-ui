import axios from "axios";

axios.interceptors.request.use(
    (config)=>{

        if (config.url === '/user/login' || config.url === '/user/register') {
            return config; // 不做任何修改直接返回
        }
        // 在请求发送前添加 Authorization 请求头
        const jwtToken = localStorage.getItem('token'); // 假设你的 JWT 存储在 localStorage 中
        if (jwtToken) {
            config.headers.Authorization = jwtToken;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

function login(params){
    return axios.post("/user/login",params)
}
function register(params){
    return axios.post("/user/register",params)
}
function getUserInfoApi(userId){
    return axios.get("/user/"+userId)
}
function getUserSelf(){
    return axios.get("/user/")
}
function updateUserInfo(params) {
    return axios.post("/user/update", params, {
        headers: {'Content-Type': 'application/json',}
    })
}

export {login,getUserInfoApi,register,updateUserInfo,getUserSelf}