const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Create the Task model from the schema
const Task = mongoose.model('Task', TaskSchema);

// Export the Task model
module.exports = Task;
