import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { useWorkflow,useEdgeStore, useAppStore } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {usehomeNodeStore, usehomeEdgeStore} from  "../../store"
import { useNavigate } from "react-router-dom";
type NodeType = 'input' | 'default' | 'output';

const NodeSidebar = ({index}:{index:string}) => {
  let history = useNavigate();
  const { homenodeData, updatehomeNodeData } = usehomeNodeStore();
  const { homeedgeData, updatehomeEdgeData } = usehomeEdgeStore();
  const {workflowData, updateWorkflowData} = useWorkflow();
  const {edgeData} = useEdgeStore();
  const {nodeData} = useAppStore();
  const [getworkflowData,setWorkfloeData] = useState<[]>([]);
  // const [getNodes,setgetNodes] = useState<[]>([]);
  // const [getEdges,setgetEdges] = useState<[]>([]);
//new workflow
const newWorkflow =()=>{
    updatehomeNodeData([]);
    updatehomeEdgeData([]);
    history('/');
}
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  //for save to Database
  const saveWorkflow =async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(index==="workflow"){
    localStorage.setItem('workflowData', JSON.stringify({ edges: edgeData, nodes: nodeData }));
    const savedWorkflowData = localStorage.getItem('workflowData');
    if (savedWorkflowData) {
      const { edges, nodes } = JSON.parse(savedWorkflowData);
      updateWorkflowData(edges, nodes);
    try {
      if(edges.length === 0 || nodes.length === 0) {
        toast.error("workflow error");
        return;
      }
      await axios.post(`/workflow`,{nodes,edges},

        {
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type':'application/json; charset=utf-8'
          }
            }
      )
      .then((res)=>{
        if(res.status===201){
          toast.success("Workflow created successfully");
        }
      })
      .catch((err)=>{
        if(err.status===500){
          toast.error("Empty workflow");
        }
      })
    } catch (error) {
      toast.error('Something went wrong');
      console.log("error"+error);
      
    }
  }
}

//for home page data
else if(index==="home"){
  try {
    if(homenodeData.length === 0 || homeedgeData.length === 0) {
      toast.error("workflow empty");
      return;
    }
    await axios.post(`/workflow`,{nodes:homenodeData,edges:homeedgeData},
      {
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type':'application/json; charset=utf-8'
        }
          }
    )
    .then((res)=>{
      if(res.status===201){
        toast.success("Workflow created successfully");
      }
    })
    .catch((err)=>{
      if(err.status===500){
        toast.error("Error creating workflow");
      }
    })
  } catch (error) {
    toast.error('Something went wrong');
    
  }

}
  };

/*  const LoadData = () =>{
    updateNodeData(getNodes);
    updateEdgeData(getEdges);
    console.log(edgeData,nodeData);

  }
  */
useEffect(()=>{
  try {
    axios.get('/workflowdata',
    {
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'content-type':'application/json; charset=utf-8'
      }
        }

    )
    .then((res)=>{
      setWorkfloeData(res?.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  } catch (error) {
    
  }
},[workflowData]);
  return (
    <>
    <aside>
      <div className="description">Drag and drop</div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
      <div className="bg-main rounded-lg mb-2 flex justify-center cursor-pointer hover:bg-bghover">
      <button onClick={newWorkflow} className=' p-2  text-xl font-bold text-white'>New workflow</button>
      </div>
      <Link to={'/upload'} className="flex justify-center bg-main rounded-lg cursor-pointer hover:bg-bghover">
        <h1 className=" p-2  text-white font-bold text-xl">Upload File +</h1>
      </Link>
      <div className="bg-main rounded-lg mt-2 flex justify-center cursor-pointer hover:bg-bghover">
      <button onClick={saveWorkflow} className=' p-2  text-xl font-bold text-white'>Save File</button>
      </div>
      <div className="flex  flex-col justify-center p-2 items-center gap-2 mt-2">
        {getworkflowData.map(({_id,nodes,edges})=>(
          <>
          <span key={_id} className=" border border-main p-1 flex justify-center flex-col gap-2 w-full">
          <p>{_id}</p>
     {/* <button onClick={()=>{setgetNodes(nodes);setgetEdges(edges);LoadData()}} className='bg-main text-white font-bold p-1 px-3 rounded-md  hover:bg-bghover'>Execute</button> */}
     </span>
     </>
        ))}
     </div>
    </aside>
    <ToastContainer />
    </>
  );
};

export default NodeSidebar;
