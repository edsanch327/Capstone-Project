import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import {fileURLToPath} from 'url';
import path from 'path';
dotenv.config();
const app=express();const port=Number(process.env.PORT)||3001;
const secret=process.env.JWT_SECRET;
if(!secret||secret==='replace-with-a-long-random-secret'){console.error('Set a secure JWT_SECRET in .env before starting the backend.');process.exit(1)}
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'}));app.use(express.json({limit:'20kb'}));
const dir=path.dirname(fileURLToPath(import.meta.url));
const db=await open({filename:path.join(dir,'forma.db'),driver:sqlite3.Database});
await db.exec(`PRAGMA foreign_keys=ON;CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP);CREATE TABLE IF NOT EXISTS appointments(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,service TEXT NOT NULL,date TEXT NOT NULL,time TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'booked',created_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id));CREATE UNIQUE INDEX IF NOT EXISTS unique_booked_slot ON appointments(date,time) WHERE status='booked';`);
const publicUser=u=>({id:u.id,name:u.name,email:u.email});
const tokenFor=u=>jwt.sign({id:u.id},secret,{expiresIn:'7d'});
async function auth(req,res,next){const token=req.headers.authorization?.replace(/^Bearer /,'');if(!token)return res.status(401).json({error:'Please log in'});try{const payload=jwt.verify(token,secret);req.user=await db.get('SELECT id,name,email FROM users WHERE id=?',payload.id);if(!req.user)return res.status(401).json({error:'Account not found'});next()}catch{return res.status(401).json({error:'Session expired. Please log in again'})}}
app.post('/api/auth/register',async(req,res)=>{const {name,email,password}=req.body||{};if(typeof name!=='string'||!name.trim()||name.length>100||typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||typeof password!=='string'||password.length<8||password.length>128)return res.status(400).json({error:'Enter a name, valid email, and password of 8–128 characters'});try{const hash=await bcrypt.hash(password,12);const result=await db.run('INSERT INTO users(name,email,password_hash) VALUES(?,?,?)',name.trim(),email.trim().toLowerCase(),hash);const user={id:result.lastID,name:name.trim(),email:email.trim().toLowerCase()};res.status(201).json({user,token:tokenFor(user)})}catch(e){if(e.code==='SQLITE_CONSTRAINT')return res.status(409).json({error:'Email already registered'});res.status(500).json({error:'Could not create account'})}});
app.post('/api/auth/login',async(req,res)=>{const {email,password}=req.body||{};if(typeof email!=='string'||typeof password!=='string')return res.status(400).json({error:'Invalid credentials'});const user=await db.get('SELECT * FROM users WHERE email=?',email.trim().toLowerCase());if(!user||!await bcrypt.compare(password,user.password_hash))return res.status(401).json({error:'Invalid email or password'});res.json({user:publicUser(user),token:tokenFor(user)})});
app.get('/api/auth/me',auth,(req,res)=>res.json({user:req.user}));
const allowedServices=['cut','colour','gloss'];const allowedTimes=['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
app.get('/api/appointments',auth,async(req,res)=>res.json({appointments:await db.all("SELECT id,service,date,time,status FROM appointments WHERE user_id=? AND status='booked' ORDER BY date,time",req.user.id)}));
app.post('/api/appointments',auth,async(req,res)=>{const {service,date,time}=req.body||{};if(!allowedServices.includes(service)||typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!allowedTimes.includes(time))return res.status(400).json({error:'Select a valid service, date and time'});const parsed=new Date(`${date}T12:00:00Z`);if(Number.isNaN(parsed.getTime())||parsed.toISOString().slice(0,10)!==date||date<new Date().toLocaleDateString('en-CA'))return res.status(400).json({error:'Select a valid future date'});try{const result=await db.run('INSERT INTO appointments(user_id,service,date,time) VALUES(?,?,?,?)',req.user.id,service,date,time);res.status(201).json({id:result.lastID,message:'Appointment booked'})}catch(e){if(e.code==='SQLITE_CONSTRAINT')return res.status(409).json({error:'That time is already booked. Please choose another.'});res.status(500).json({error:'Unable to book appointment'})}});
app.delete('/api/appointments/:id',auth,async(req,res)=>{const result=await db.run("UPDATE appointments SET status='cancelled' WHERE id=? AND user_id=? AND status='booked'",req.params.id,req.user.id);if(!result.changes)return res.status(404).json({error:'Appointment not found'});res.json({message:'Appointment cancelled'})});
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({error:'Internal server error'})});
app.listen(port,()=>console.log(`Backend running at http://localhost:${port}`));
