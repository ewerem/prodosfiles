import Apikit from "./Apikit";


export const SignupAction = (data) => {
    return Apikit.post ("/sign-up/", data);
};

export const LoginAction = (data) =>{
    return Apikit.post("/login/", data);
};

export const ForgotPasswordAction = (data)=>{
     return Apikit.post("/forgot-pass", data);
}

export const LoginOutAction = (data) =>{
    return Apikit.post("/logout/", data);
};


export const ResetAction = (data, token)=>{
    return Apikit.post("/reset-password/", data,{
     headers:{
        authorization: `Token ${token}`,
     },
    });
};

export const ResetPassword =(data,token)=> {
    return Apikit.put("/rest/pswd", data,{
        headers:{
            authorization:`Token ${token}`,
        },
    });
};

export const ForgotAction = (data)=>{
    return Apikit.post("/forgot-password", data);
};