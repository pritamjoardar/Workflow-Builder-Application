import { create } from 'zustand'
import { persist } from 'zustand/middleware'
//for home
const usehomeNodeStore = create(
  persist(
    (set) => ({
      homenodeData: [],
      updatehomeNodeData: (nodeData) => set({ homenodeData: nodeData }),
    }),
    { name: 'homeNodeData' }
  )
);

const usehomeEdgeStore = create(
  persist(
    (set) => ({
      homeedgeData: [],
      updatehomeEdgeData: (edgeData) => set({ homeedgeData: edgeData }),
    }),
    { name: 'homeEdgeData' }
  )
);

//for myworkfloew
const useAppStore = create(
  persist(
    (set, get) => ({
      nodeData: [],
      updateNodeData: (nodeData) => set({ nodeData: nodeData }),
    }),
    {
      name: 'App-storage', 
     
    },
  ),
)

const useEdgeStore = create(
  persist(
    (set, get) => ({
      edgeData: [],
      updateEdgeData: (edgeData) => set({ edgeData:edgeData }),
    }),
    {
      name: 'Edge-storage', 
    },
  ),
);

const useWorkflow = create(
  persist(
    (set, get) => ({
      workflowData: { edges: [], nodes: [] },
      updateWorkflowData: (edges, nodes) => {
        set({ workflowData: {edges, nodes } });
      },
    }),
    {
      name: 'Workflow-storage', 
    },
  ),
);

export {usehomeNodeStore ,usehomeEdgeStore,useAppStore, useEdgeStore ,useWorkflow } ;