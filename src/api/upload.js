import axios from "axios";
function fileApi(){
    return axios.post("/up/token")
}

export {fileApi}