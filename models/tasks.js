const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: Boolean,
        default: false
    },
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('tasks', TaskSchema);
