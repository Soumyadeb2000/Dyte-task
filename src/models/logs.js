const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogsSchema = new Schema({
    level: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    resourceId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    traceId: {
        type: String,
        required: true
    },
    spanId: {
        type: String,
        required: true
    },
    commit: {
        type: String,
        required: true
    },
    metadata: {
        type: {
            parentResourceId: {
                type: String,
                required: true
            }
        },
        required: true
    }
})

LogsSchema.index({level: 'text', message: 'text', resourceId: 'text', timestamp: 'text', traceId: 'text', spanId: 'text', commit: 'text', 'metadata.parentResourceId': 'text'});

module.exports = mongoose.model('logs',LogsSchema);