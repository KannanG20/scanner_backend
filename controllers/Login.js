const con = require('../utils/DBConfig')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const key = process.env.JWT_SECRET
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            status: 'failed',
            error: 'Username and password are required'
        });
    }else{
        const query = 'SELECT * FROM users WHERE username = ?';
        con.query(query, [username], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 'failed',
                    error: err.message
                });
            }else{
                if (result.length > 0) {
                    if (bcrypt.compareSync(password, result[0].password)) {
                      // User login successful, create JWT
                      const token = jwt.sign({ id: result[0].id, username: result[0].username }, key, { expiresIn: '1h' });
                      res.status(200).json({ 
                        status: 'success',
                        data: {
                            id: result[0].id,
                            username: username,
                        },
                        jwt_token: token
                     });
                    } else {
                      res.status(401).json({
                        status: 'failed',
                        error: 'Invalid Password'
                      });
                    }
                  } else {
                    // If user does not exist, create user
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
                    con.query(insertQuery, [username, hashedPassword], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                status: 'failed',
                                error: err.message
                            });
                        }else{
                            const userId = result.insertId;
                            const token = jwt.sign({ id: userId, username: username }, key, { expiresIn: '1h' });
                            res.status(200).json({ 
                                status: 'success',
                                data: {
                                    id: userId,
                                    username: username,
                                },
                                jwt_token: token
                             });
                        }                 
                    });
                  }
            }      
        });
    }    
  };