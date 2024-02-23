import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

function FileUpload() {
  const [ file,setFile ] = useState();

  const handleFile = (e) => {
     setFile(e.target.files[0]);
  };

  useEffect (() => {
    axios.get('http://localhost:8081/image')
    .then(res => console.log(res))
    .catch(err => console.log(err)); 
  },[])

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('image',file);
    console.log("formdata",formdata);
    axios.post('http://localhost:8081/upload', formdata)
    .then(res => {
      if(res.data.Status === "Success") {
        console.log("Succeded");
        alert("Image Uploaded Successfully!!");
      }
      else {
        console.log("Failed");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='container'>
        <input type="file" onChange={handleFile}/>
        <button onClick={handleUpload}>Uplaod</button>
    </div>
  )
}

export default FileUpload