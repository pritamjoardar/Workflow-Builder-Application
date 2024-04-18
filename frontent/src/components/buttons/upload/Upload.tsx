import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './upload.css';
import {useEdgeStore , useAppStore} from '../../../store';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader.jsx';
interface Node {
  id: string;
  type: string;
  data: { label: string };
  position: { x: number; y: number };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

const UploadButton = () => {
  let history = useNavigate();
  const {updateNodeData} = useAppStore();
  const {updateEdgeData} = useEdgeStore();
  const [loader,setLoader] = useState<boolean>(false);

  //for uploaded the file
  const handleFileUpload = async (e: any) => {
    setLoader(true);
    const file = e.target.files![0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res)=>{
        if(res.status===200){
          setLoader(false);
          toast.success("Data excution sussessfully");
          setTimeout(()=>{
            updateNodeData(res.data.nodes);
            updateEdgeData(res.data.edges);
            history('/myWorkflow');
          },1000);

        }

      })
      .catch((error)=>{
        if(error.status===500){
          setLoader(false);
          toast.error("workflow error");
        }
        //  console.log(error);
      })
    } catch (error) {
      setLoader(false);
    }
  };

  return (
<>
<div className="flex justify-center items-center h-screen">
<form className="file-upload-form">
  <label htmlFor="file" className="file-upload-label">
    <div className="file-upload-design">
      <svg viewBox="0 0 640 512" height="1em">
        <path
          d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
        ></path>
      </svg>
      <p>Drag and Drop</p>
      <p>or</p>
      <span className="browse-button">Upload file +</span>
      {loader?<Loader/>:null}
      
    </div>
    <input accept='.csv' onChange={handleFileUpload} id="file" type="file" />
  </label>
</form>
</div>
<ToastContainer />

</>
  )
}

export default UploadButton
