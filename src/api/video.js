import axios from "axios";
function getVideoCoverList(page,size){
    return axios.get('/video/'+page+"/"+size);
}

function getVideoInfoApi(id){
    return axios.post("/video/"+id)
}

function updatePlayCountApi(id){
    return axios.get("/video/count/"+id)
}
function getCoverListSelfApi(page,size){
    return axios.post("/video/"+page+"/"+size,null,{
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
}
export {getVideoCoverList,getVideoInfoApi,updatePlayCountApi,getCoverListSelfApi}