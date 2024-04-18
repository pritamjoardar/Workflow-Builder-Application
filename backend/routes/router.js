const express =require("express");
const router = express.Router();
const multer = require('multer');
const Papa = require('papaparse');
const fs = require('fs');
const Workflow = require('../model/WorkflowSchema')
const upload = multer({ dest: 'uploads/' });

router.post('/workflow',async(req,res)=>{
    try {
        const { nodes, edges } = req.body;
        if(nodes.length==0 || edges.length==0){
          return res.status(500).json({ message: 'Please provide nodes and edges' });
        }else{
        const newWorkflow = new Workflow({ nodes, edges });
        await newWorkflow.save();
        res.status(201).json({ message: 'Workflow data saved successfully' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving workflow data' });
      }
 });

 router.get('/workflowdata',async(req,res)=>{
    try {
        const workflow = await Workflow.find();
        res.status(200).json(workflow);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving workflow data' });
      }
 });

 //for uploading file
 router.post('/upload', upload.single('file'), (req, res) => {
  setTimeout(() => {
  const file = req.file;
  fs.readFile(file.path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    Papa.parse(data, {
      header: true,
      complete: (results) => {
        const dataUpdate = [];
        const edgesUpdate = [];
        results.data.forEach((record, index) => {
          const nameNodeId = `name_${index}`;
          const ageNodeId = `age_${index}`;

          const nameNode = {
            id: nameNodeId,
            type: 'default',
            data: { label: `name: ${record.Name.toLowerCase()}` },
            position: { x: 250, y: 5 + index * 200 },
          };

          const ageNode = {
            id: ageNodeId,
            type: 'default',
            data: { label: `age: ${record.Age}` },
            position: { x: 450, y: 5 + index * 200 },
          };

          const edge = {
            id: `edge_${index}`,
            source: nameNodeId,
            target: ageNodeId,
          };

          dataUpdate.push(nameNode, ageNode);
          edgesUpdate.push(edge);
        });
        res.json({ nodes: dataUpdate, edges: edgesUpdate });
      },
    });
  });
},[59000]);
});
module.exports = router;