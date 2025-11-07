import React, { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../auth';
export default function PostEdit({ post, onSaved, onCancel }){
  const { token } = useAuth();
  const [title,setTitle]=useState(post.title);
  const [body,setBody]=useState(post.body);
  const [err,setErr]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(e){ e.preventDefault(); setErr(''); setLoading(true);
    try{ const u = await api(`/posts/${post.id}`,{ method:'PUT', body:{ title, body }, token }); onSaved && onSaved(u); }
    catch(e){ setErr(e.message); } finally{ setLoading(false); } }
  return (<form onSubmit={submit}>
    {err && <p style={{color:'crimson'}}>{err}</p>}
    <input value={title} onChange={e=>setTitle(e.target.value)} />
    <textarea rows={5} value={body} onChange={e=>setBody(e.target.value)} />
    <div className="row" style={{justifyContent:'flex-end'}}>
      <button type="button" className="ghost" onClick={onCancel}>Cancel</button>
      <button className="primary" disabled={loading || !title || !body}>{loading? 'Saving...' : 'Save changes'}</button>
    </div>
  </form>);
}
