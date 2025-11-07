import React, { useEffect, useState } from 'react';
import { api } from './api';
import { AuthProvider, useAuth } from './auth';
import Signup from './components/Signup';
import Signin from './components/Signin';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Profile from './components/Profile';
import PostEdit from './components/PostEdit';

function Shell(){
  const { user, logout } = useAuth();
  const [posts,setPosts] = useState([]);
  const [editing,setEditing] = useState(null);
  const [error,setError] = useState('');
  async function load(){ try{ setPosts(await api('/posts')); setError(''); } catch(e){ setError(e.message); } }
  useEffect(()=>{ load(); },[]);
  return (<div className="container">
    <header><div className="brand">React Blog</div><div>{user && (<><span className="meta">Hi, {user.name}</span> <button className="ghost" onClick={logout}>Sign out</button></>)}</div></header>
    {error && <div className="card" style={{color:'crimson'}}>Error: {error}</div>}
    {!user ? (<div className="grid">
      <div className="card"><h3>Create an account</h3><Signup onSuccess={()=>{}}/></div>
      <div className="card"><h3>Sign in</h3><Signin/></div>
    </div>) : (<div className="grid">
      <div>
        <div className="card"><h3>New Post</h3><PostForm onCreated={(p)=>setPosts([p,...posts])}/></div>
        <div className="card"><h3>All Posts</h3><PostList posts={posts} me={user} onEdit={setEditing} onDelete={(id)=>setPosts(posts.filter(p=>p.id!==id))}/></div>
      </div>
      <div>
        <div className="card"><Profile/></div>
        {editing && <div className="card"><h3>Edit Post</h3><PostEdit post={editing} onSaved={(u)=>{ setPosts(posts.map(p=>p.id===u.id?u:p)); setEditing(null); }} onCancel={()=>setEditing(null)}/></div>}
      </div>
    </div>)}
  </div>);
}

export default function App(){ return <AuthProvider><Shell/></AuthProvider>; }
