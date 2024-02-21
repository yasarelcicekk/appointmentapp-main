import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(`userprofile ${user}`)
  return (
    <div>
      {user ? (
        <div>
          <h2>Profil Bilgileri</h2>
          <p>Name: {user.name}</p>
          <p>Mail: {user.email}</p>
          <p>Age: {user.age}</p>
          {/* Diğer bilgileri burada ekleyin */}
        </div>
      ) : (
        <p>Oturum açmış bir kullanıcı bulunamadı.</p>
      )}
    </div>
  );
      };

export default Profile;
