import axios from "axios";

axios.interceptors.request.use(
    (config)=>{
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

function getCollectListApi() {
    // 在这里进行你的具体请求逻辑
    return axios.get('/collect/')

}

function addCollect(params){
    return axios.post('/collect/',params)
        .then((res)=>{
            return res.data.data
        })
        .catch(err=>{
            console.log(err)
        })
}

function addCollectVideoApi(collectId,videoId){
    return axios.post('/cv/'+collectId+"/"+videoId)

}

function getCollectVideoListApi(collectId,page,size){
    return axios.post('/cv/'+collectId+"/"+page+"/"+size)
}

function hasCollectVideoApi(videoId){
    return axios.post("/cv/"+videoId)
}

export {getCollectListApi,addCollect,addCollectVideoApi,getCollectVideoListApi
,hasCollectVideoApi};