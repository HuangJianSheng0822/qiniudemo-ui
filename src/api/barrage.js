import axios from "axios";
function getBarrageListApi(id){
    return axios.get(`/barrage/`+id)
}

export {getBarrageListApi}