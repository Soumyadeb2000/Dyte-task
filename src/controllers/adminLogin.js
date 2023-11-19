const adminModel = require('../models/admin');

exports.login = async (req, res) => {
    try {
        const name = req.body.name;
        const pass = req.body.password;
        const data = await adminModel.findOne({ name: name });
        console.log(data);
        if (data.password === pass) {
            return res.status(200).json({ status: true });
            console.log("sucess");
        } else {
            return res.status(403).json({ status: false });
            console.log("fail");
        }
    } catch (error) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }

}