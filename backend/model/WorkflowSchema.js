
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define node schema
const nodeSchema = new Schema({
  id: String,
  type: String,
  data: Object,
  position: Object,
  width: Number,
  height: Number
});

// Define edge schema
const edgeSchema = new Schema({
  id: String,
  source: String,
  target: String
});

// Define workflow schema
const workflowSchema = new Schema({
  nodes: [nodeSchema],
  edges: [edgeSchema]
});

// Create and export the Workflow model
module.exports = mongoose.model('Workflow', workflowSchema);