export const CreateProfileAction = (data, sessionToken) => {
  return Apikit.put("/createaccount", data);
};

export const GetFolderAction = (data) => {
  return Apikit.get("/get-folders/", data);
};

export const Create = (data) => {
  return Apikit.post ("/create-f/", data);
};

export const Upload = (data)=>{
  return Apikit.post ("/upload_file/", data);
}

export const Starred = (data)=>{
  return Apikit.get("/starred-f/", data);
}




  

