import React from 'react';
import { useAuth } from '../auth';
export default function Profile(){
  const { user } = useAuth();
  if(!user) return <p>Sign in to see your profile.</p>;
  return (<div>
    <h3>My Profile</h3>
    <p><strong>Username:</strong> {user.user_id}</p>
    <p><strong>Name:</strong> {user.name}</p>
    {user.age && <p><strong>Age:</strong> {user.age}</p>}
    {user.occupation && <p><strong>Occupation:</strong> {user.occupation}</p>}
    {user.city && <p><strong>City:</strong> {user.city}</p>}
  </div>);
}
