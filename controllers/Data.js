const con = require('../utils/DBConfig')

exports.post_data = async (req, res) => {
    try {
        let data = {code: req.body.data, user_id: req.query.userId}; // include user_id in data
        let sql = 'INSERT INTO codes SET ?';
        con.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 'failed',
                    error: err.message
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: data
                });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
}

exports.get_data = async (req, res)=> {
    try {
        let sql = 'SELECT * FROM codes WHERE user_id = ?';
        con.query(sql, [req.query.userId], (err, rows) => { 
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 'failed',
                    error: err.message
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: rows
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
}