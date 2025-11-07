import React, { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../auth';
export default function Signin(){
  const { login } = useAuth();
  const [user_id,setUserId] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState(''); const [loading,setLoading]=useState(false);
  async function submit(e){ e.preventDefault(); setLoading(true); setErr(''); try{
    const data = await api('/auth/signin',{ method:'POST', body:{ user_id, password } });
    login(data);
  } catch(e){ setErr(e.message); } finally { setLoading(false); } }
  return (<form onSubmit={submit}>
    {err && <p style={{color:'crimson'}}>{err}</p>}
    <div className="row">
      <input placeholder="Username" value={user_id} onChange={e=>setUserId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
    </div>
    <button className="primary" disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
  </form>);
}
