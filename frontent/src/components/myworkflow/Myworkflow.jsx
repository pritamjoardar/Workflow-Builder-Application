import React, { useState, useRef, useCallback, useEffect } from 'react';
import  {useEdgeStore, useAppStore} from '../../store';

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeSidebar from "../sidebar/NodeSidebar";

let id = 0;
const getId = () => `dndnode_${id++}`;

const Myworkflow = () => {
  const {nodeData, updateNodeData} = useAppStore();
  const {edgeData,updateEdgeData} = useEdgeStore();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgeData);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance,setNodes],
  );
useEffect(()=>{
  updateNodeData(nodes);
  updateEdgeData(edges);
},[nodes,edges,nodeData,edgeData,updateNodeData,updateEdgeData]);
  return (
    <div className="dndflow"  style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <NodeSidebar index ={"workflow"}/>
      </ReactFlowProvider>
    </div>
  );
};

export default Myworkflow;
