import React, { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../auth';
export default function PostForm({ onCreated }){
  const { token } = useAuth();
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const [err,setErr] = useState(''); const [loading,setLoading] = useState(false);
  async function submit(e){ e.preventDefault(); setErr(''); setLoading(true);
    try{ const p = await api('/posts',{ method:'POST', body:{ title, body }, token }); onCreated && onCreated(p); setTitle(''); setBody(''); }
    catch(e){ setErr(e.message); } finally{ setLoading(false); } }
  return (<form onSubmit={submit}>
    {err && <p style={{color:'crimson'}}>{err}</p>}
    <input placeholder="Post title" value={title} onChange={e=>setTitle(e.target.value)} />
    <textarea rows={5} placeholder="Write something..." value={body} onChange={e=>setBody(e.target.value)} />
    <button className="primary" disabled={loading || !title || !body}>{loading? 'Posting...' : 'Publish'}</button>
  </form>);
}
