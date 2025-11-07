import React from 'react';
import { api } from '../api';
import { useAuth } from '../auth';
export default function PostList({ posts, me, onEdit, onDelete }){
  const { token } = useAuth();
  async function del(id){ if(!confirm('Delete this post?')) return; await api(`/posts/${id}`,{ method:'DELETE', token }); onDelete && onDelete(id); }
  return (<div>
    {posts.length===0 && <p>No posts yet.</p>}
    {posts.map(p=> (<div key={p.id} className="card">
      <div className="post-title">{p.title}</div>
      <div className="meta">by {p.authorName} • {new Date(p.createdAt).toLocaleString()}</div>
      <p style={{whiteSpace:'pre-wrap'}}>{p.body}</p>
      {me && me.id===p.authorId && (<div className="row" style={{justifyContent:'flex-end'}}>
        <button className="ghost" onClick={()=>onEdit(p)}>Edit</button>
        <button className="primary" onClick={()=>del(p.id)}>Delete</button>
      </div>)}
    </div>))}
  </div>);
}
