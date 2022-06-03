import express, { query } from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';


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

app.get('/home', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('home', {
            
    });
});
app.get('/homeAdmin', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('homeAdmin', {
            
    });
});

app.get('/', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('login', {
            
    });
});


app.get('/unggahTopik', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('unggahTopik',{

    });
});

app.get('/skripsiSaya', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('topikSkripsiSaya',{

    });
});

app.get('/kelolaAKun', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.render('kelolaAkun',{

    });
});

app.post('/', async(req,res) => {
    const conn = await dbConnect();
    conn.release();
    res.redirect('homeAdmin');
})