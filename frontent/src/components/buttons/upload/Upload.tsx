import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse';
import './upload.css';
import useAppStore,{useedgeStore} from '../../../store';


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
  const {updateEdgeData} = useedgeStore();
  const {edgeData} = useedgeStore();
  const [count,setCount] = useState<number>(60);
  const [start,setStart] = useState<boolean>(false);
  const handleFileUpload = (e: any) => {
    const file = e.target.files![0];
    Papa.parse(file, {
      header: true,
      complete: (res: any) => {
        const dataUpdate: Node[] = [];
        const edgesUpdate: Edge[] = [];
        res.data.forEach((record: any, index: number) => {
          const nameNodeId = `name_${index}`;
          const ageNodeId = `age_${index}`;
  
          const nameNode: Node = {
            id: nameNodeId,
            type: 'default',
            data: { label: `Name: ${record.Name.toLowerCase()}` },
            position: { x: 250, y: 5 + index * 200 },
          };
  
          const ageNode: Node = {
            id: ageNodeId,
            type: 'default',
            data: { label: `Age: ${record.Age}` },
            position: { x: 450, y: 5 + index * 200 },
          };
  
          const edge: Edge = {
            id: `edge_${index}`,
            source: nameNodeId,
            target: ageNodeId,
          };
  
          dataUpdate.push(nameNode, ageNode);
          edgesUpdate.push(edge);
        });
        
        updateNodeData(dataUpdate);
        updateEdgeData(edgesUpdate);
        setStart(true);
        setInterval(()=>{
          setCount(pre=>pre-1);
        },1000)
       setTimeout(()=>{

         history('/myWorkflow');
       },60000);
      },
    });
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
      <div className='text-black '>{start?<p>{count}</p>:null}</div>

    </div>
    <input accept='.csv' onChange={handleFileUpload} id="file" type="file" />
  </label>
</form>
</div>
</>
  )
}

export default UploadButton
