

export const CreateProfileAction = (data, sessionToken) => {
  return Apikit.put("/createaccount", data);
};

export const GetFolderAction = (data) => {
<<<<<<< HEAD
  return Apikit.get("/all-folders", data);
=======
  return Apikit.get("/get-folders/", data);
>>>>>>> 0058c0049cfff3030fd2718d3f3d7e7734dc6cae
};

export const Create = (data) => {
  return Apikit.post ("/create-f/", data);
};

<<<<<<< HEAD
export const Starred = (data) => {
  return Apikit.post ("/starred-f", data);
};
=======
export const Upload = (data)=>{
  return Apikit.post ("/upload_file/", data);
}

export const Starred = (data)=>{
  return Apikit.get("/starred-f/", data);
}
>>>>>>> 0058c0049cfff3030fd2718d3f3d7e7734dc6cae




  

