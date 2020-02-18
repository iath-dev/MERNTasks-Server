const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('projects', projectSchema);
