import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      nodeData: {},
      updateNodeData: (nodeData) => set({ nodeData: nodeData }),
    }),
    {
      name: 'App-storage', // name of the item in the storage (must be unique)
     
    },
  ),
)

const useedgeStore = create(
  persist(
    (set, get) => ({
      edgeData: [],
      updateEdgeData: (edgeData) => set({ edgeData:edgeData }),
    }),
    {
      name: 'Edge-storage', // name of the item in the storage (must be unique)
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
      name: 'Workflow-storage', // name of the item in the storage (must be unique)
    },
  ),
);
export default useAppStore
export {useedgeStore,useWorkflow}