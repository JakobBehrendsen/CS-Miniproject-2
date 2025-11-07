import React, { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../auth';
export default function Signup({ onSuccess }){
  const { login } = useAuth();
  const [form,setForm] = useState({ user_id:'', password:'', name:'', age:'', occupation:'', city:'' });
  const [loading,setLoading] = useState(false); const [err,setErr]=useState('');
  function set(k,v){ setForm({...form,[k]:v}); }
  async function submit(e){ e.preventDefault(); setLoading(true); setErr(''); try{
    const data = await api('/auth/signup',{ method:'POST', body:{
      user_id: form.user_id, password: form.password, name: form.name,
      age: form.age? Number(form.age): undefined, occupation: form.occupation, city: form.city
    }});
    login(data); onSuccess && onSuccess();
  } catch(e){ setErr(e.message); } finally{ setLoading(false); } }
  return (<form onSubmit={submit}>
    {err && <p style={{color:'crimson'}}>{err}</p>}
    <div className="row">
      <input placeholder="Username" value={form.user_id} onChange={e=>set('user_id',e.target.value)} />
      <input type="password" placeholder="Password" value={form.password} onChange={e=>set('password',e.target.value)} />
    </div>
    <div className="row">
      <input placeholder="Name" value={form.name} onChange={e=>set('name',e.target.value)} />
      <input placeholder="Age" value={form.age} onChange={e=>set('age',e.target.value)} />
    </div>
    <div className="row">
      <input placeholder="Occupation" value={form.occupation} onChange={e=>set('occupation',e.target.value)} />
      <input placeholder="City" value={form.city} onChange={e=>set('city',e.target.value)} />
    </div>
    <button className="primary" disabled={loading}>{loading? 'Creating...' : 'Create account'}</button>
  </form>);
}
