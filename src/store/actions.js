

export const Login = (username,password)=>{
    const token =username+password
    return({
        type:'LOGIN',
        payload:token,
    })
}

export const Logout = ()=>{
    return({
        type:'LOGIN',
        payload:null,
    })
}