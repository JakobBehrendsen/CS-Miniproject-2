import { Router } from 'express';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { signToken } from '../auth.js';
const router = Router();
router.post('/signup', async (req,res)=>{ try{ const {user_id,password,name,age,occupation,city}=req.body||{}; if(!user_id||!password||!name) return res.status(400).json({error:'Missing required fields'}); if(db.users.find(u=>u.user_id===user_id)) return res.status(409).json({error:'user_id already exists'}); const passwordHash=await bcrypt.hash(password,10); const user={id:nanoid(),user_id,name,passwordHash,age,occupation,city}; db.users.push(user); const token=signToken(user); res.json({token,user:{id:user.id,user_id,name,age,occupation,city}});}catch{res.status(500).json({error:'Signup failed'})}});
router.post('/signin', async (req,res)=>{ try{ const {user_id,password}=req.body||{}; const user=db.users.find(u=>u.user_id===user_id); if(!user) return res.status(401).json({error:'Invalid credentials'}); const ok=await bcrypt.compare(password,user.passwordHash); if(!ok) return res.status(401).json({error:'Invalid credentials'}); const token=signToken(user); res.json({token,user:{id:user.id,user_id:user.user_id,name:user.name,age:user.age,occupation:user.occupation,city:user.city}});}catch{res.status(500).json({error:'Signin failed'})}});
export default router;
