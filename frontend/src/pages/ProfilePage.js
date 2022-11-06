import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/profile.css'
import avatar from '../assets/avatar.png'

const ProfilePage = () => {
  return (
    <div className='profile-container'>
      <div className='container-content'>
        <div className='profile-data'>
          <div className='profile-header'>
            <div className='profile-pic'>
              <img src={avatar} alt='' />
              <span> <FontAwesomeIcon icon={faPenAlt} /> </span>
            </div>
          </div>
          <div className='profile-description'>
            <div className='profile-full-name'>
              Ben Brahim Jamil
            </div>
            <div className='profile-user-name'>
              01JAMIL
            </div>
            <div className='profile-bio'>
              <div style={{ fontWeight: 'bold', fontSize: '20px' }} >Bio</div>
              <div style={{padding: '10px'}} >
                Full stack web developer
              </div>
            </div>
            <div className='profile-actions'>
              <button>
                Update profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage