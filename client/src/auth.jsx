import { createContext, useContext, useEffect, useState } from 'react';
const Ctx=createContext(null);
export function AuthProvider({children}){
  const [user,setUser]=useState(null); const [token,setToken]=useState(localStorage.getItem('token')||'');
  useEffect(()=>{ const u=localStorage.getItem('user'); if(u) setUser(JSON.parse(u)); },[]);
  function login(data){ setUser(data.user); setToken(data.token); localStorage.setItem('token',data.token); localStorage.setItem('user',JSON.stringify(data.user)); }
  function logout(){ setUser(null); setToken(''); localStorage.removeItem('token'); localStorage.removeItem('user'); }
  return <Ctx.Provider value={{user,token,login,logout}}>{children}</Ctx.Provider>;
}
export function useAuth(){ return useContext(Ctx); }
