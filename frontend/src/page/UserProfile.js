import React from 'react';
import { useSelector } from 'react-redux';
import './page.css'

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(`userprofile ${user}`);
  return (
    <div className="profile-page">
      <div className="right-container profile-container">
        <h2>Profil Bilgileri</h2>
        <div className="input-group">
          <label>
            Name:
            <input type="text" value={user.name} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Mail:
            <input type="email" value={user.email} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Age:
            <input type="number" value={user.age} readOnly />
          </label>
        </div>
        {/* Diğer bilgileri burada ekleyin */}
      </div>
      <div className="vertical-line"></div> 
      <div className="left-container">
        <h2>Randevularım</h2>
        <div className="input-group">
          <label>
            Date:
            <input type="text" value="Date" readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Time:
            <input type="text" value="Time" readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Doctor:
            <input type="text" value="Doctor" readOnly />
          </label>
        </div>
        {/* Buraya randevularınızı listelemek için gerekli içeriği ekleyin */}
      </div>
    </div>
  );
};

export default Profile;
