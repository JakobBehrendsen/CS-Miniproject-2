import jwt from 'jsonwebtoken';
export function signToken(user){ const secret=process.env.JWT_SECRET||'devsecret'; return jwt.sign({id:user.id,user_id:user.user_id,name:user.name}, secret,{expiresIn:'7d'}); }
export function authRequired(req,res,next){ const h=req.headers.authorization||''; const t=h.startsWith('Bearer ')?h.slice(7):null; if(!t) return res.status(401).json({error:'Missing token'}); try{ req.user=jwt.verify(t,process.env.JWT_SECRET||'devsecret'); next(); }catch{ return res.status(401).json({error:'Invalid token'}); } }
