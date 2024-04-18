const express =require("express");
const router = express.Router();
const Workflow = require('../model/WorkflowSchema')

router.post('/workflow',async(req,res)=>{
    try {
        const { nodes, edges } = req.body;
        const newWorkflow = new Workflow({ nodes, edges });
        await newWorkflow.save();
        res.status(201).json({ message: 'Workflow data saved successfully' });
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

module.exports = router;