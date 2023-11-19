const LogsModel = require('../models/logs');

exports.ingestorController = async (req, res) => {
    try {
        const {level, message, resourceId, timestamp, traceId, spanId, commit} = req.body;
        const parentResourceId = req.body.metadata.parentResourceId;
        const log = new LogsModel({level, message, resourceId, timestamp, traceId, spanId, commit, metadata: {parentResourceId}});
        await log.save();
        return res.status(200).json({level, message, resourceId, timestamp, traceId, spanId, commit, metadata: {parentResourceId}});    
    } catch (error) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }
}

exports.timeFilterController = async (req, res) => {
    try {
        const start = req.query.start;
        const end = req.query.end;
        const data = await LogsModel.find({timestamp: {
            $gte: new Date(start),
            $lte: new Date(end)
        }})        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }

    
}

exports.regularExpressionSearch = async (req, res) => {
    try {
        const text = req.query.text;
        const data = await LogsModel.find({ $text: { $search: text, $caseSensitive: false } });
        res.status(200).json(data);        
    } catch (error) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }

}

exports.filterController = async (req, res) => {
    try {
        const filter = req.params.ftr;
        const filterData = req.query.data;
        let data;
        switch (filter) {
            case 'level': {
                data = await LogsModel.find({level: filterData})
            }
            break;
            case 'message': {
                data = await LogsModel.find({message: filterData})
            }
            break;
            case 'resourceId': {
                data = await LogsModel.find({resourceId: filterData})
            }
            break;
            case 'timestamp': {
                data = await LogsModel.find({timestamp: filterData})
            }
            break;
            case 'traceId': {
                data = await LogsModel.find({traceId: filterData})
            }
            break;
            case 'spanId': {
                data = await LogsModel.find({spanId: filterData})
            }
            break;
            case 'commit': {
                data = await LogsModel.find({commit: filterData})
            }
            break;
            case 'parentResourceId': {
                data = await LogsModel.find({parentResourceId: filterData})
            }
            break;
        }
        res.status(200).json(data);        
    } catch (error) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }

}
