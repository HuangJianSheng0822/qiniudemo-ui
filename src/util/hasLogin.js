function hasLogin(){
    const jwtToken = localStorage.getItem('token'); // 从localStorage中获取JWT
    return jwtToken!=null
}

export {hasLogin}