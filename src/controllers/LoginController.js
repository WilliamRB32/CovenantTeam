const bcrypt = require('bcrypt');
const { connect } = require('../routes/login');

function login(req,res){
    if(req.session.loggedin != true){
        res.render('login/index');
    }else{
        res.redirect('/');
    }
    
}

function register(req,res){
    if(req.session.loggedin != true){
        res.render('login/register');
    
    }else{
        res.redirect('/');
    }

    res.render('login/register');
}

function auth(req,res){
    const data = req.body;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM users WHERE email = ?', [data.email],(err,userdata) =>{
            if(userdata.length > 0){
                userdata.forEach(element =>{
                    bcrypt.compare (data.password, element.password,(err,isMatch)=>{
                        if(!isMatch){
                            res.render('login/index', { error: 'Error: incorrect password !'});
                        }else{
                            req.session.loggedin = true;
                            req.session.name= element.name;
    
                            res.redirect('/');
                        }
                    })
                })
            }else{
                res.render('login', {error: 'Error: User already exists  '})
    
            }
        })
    })
    
}

function storeUser(req,res){
    const data = req.body;

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM users WHERE email = ?', [data.email],(err,userdata) =>{
            if(userdata.lenght > 0){
                res.render('login/register', {error: 'Error: User already exists  '})
            }else{
                bcrypt.hash(data.password,12).then(hash =>{
                    data.password = hash; 
            
                    req.getConnection((err,conn) =>{
                        conn.query('INSERT INTO users SET?',[data],(err,rows)=>{
                            res.redirect('/');
                        });
                    });
                });
            }
        })
    })


    
}

function logout(req,res){
    if(req.session.loggedin == true){
        req.session.destroy();
    }else{
        res.redirect('/login');
    }
}

module.exports = {
    login: login,
    register: register,
    storeUser,
    auth,
    logout,
}