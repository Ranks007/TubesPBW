import express from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';
import flash from 'connect-flash'

var route = express.Router();
const getRoles = (conn, username) => {
    return new Promise((resolve,reject) => {
        conn.query(`SELECT roles FROM dosen WHERE username LIKE '%${username}%' `, (err,result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};
// Connect Database

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DATATUBES'
});

const dbConnect = () => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,conn) => {
            if(err){
                reject(err);
            }
            else{
                resolve(conn);
                
            }
        })
    })
}


// ambil koneksi

route.get('/home', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    if(req.session.loggedin){
        res.render('home', {
            
        });
    } else {
        res.send('Anda harus login terlebih dahulu')
    }
});

route.get('/homeAdmin', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    if(req.session.loggedin){
        res.render('homeAdmin', {
            
        });
    } else {
        res.send('Anda harus login terlebih dahulu')
    }
});

route.get('/', async(req,res) => {
    const conn = await dbConnect();
    const message = req.flash('message')
    conn.release();
    res.render('login', { message})
    });


route.get('/unggahTopik', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('unggahTopik',{

    });
});

route.get('/skripsiSaya', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('topikSkripsiSaya',{

    });
});

route.get('/kelolaAKun', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('kelolaAkun',{

    });
});

route.post('/',express.urlencoded(), async(req,res) => {
    const conn = await dbConnect();
    var username = req.body.user;
    var password = req.body.pass;
    var roleDosen = getRoles(conn,username);
    var sql = 'SELECT username, pwd, roles FROM dosen WHERE username =? AND pwd =?';
    conn.query(sql, [username,password], (err, results)=>{
        if(err) throw err;
        if(results.length > 0){
            req.session.loggedin = true;
            req.session.username = username;
            if(results[0].roles == "Admin"){
                res.redirect('/homeAdmin')
                console.log(results)
            }
            else if(results[0].roles == "Dosen"){
                res.redirect('/home')
                console.log(results)
            }
        }
        else{
            req.flash('message', 'Username atau Password anda salah!');
            res.redirect('/')
        }
        res.end();
    })
})

export {route};