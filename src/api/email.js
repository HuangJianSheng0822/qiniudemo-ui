import axios from "axios";
function sendEmailApi(email){
    return axios.post('/email/'+email);
}

export {sendEmailApi}