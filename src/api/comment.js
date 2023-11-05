import axios from "axios";
function getChildCommentsApi(rootId,page,size){
    return axios.get("/comment/"+rootId+"/"+page+"/"+size)
}

function getRootCommentApi(id,page,size){
    return axios.get("/comment/r/"+id+"/"+page+"/"+size);
}

function addCommentApi(params){
    return axios.post("/comment/",params,{
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
}
export {getChildCommentsApi,getRootCommentApi,addCommentApi}