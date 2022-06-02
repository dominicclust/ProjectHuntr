import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded, user }){

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <NavLink className='sessionLink' to='/projects/new'>
          Submit Your Project
        </NavLink>
        <ProfileButton className='sessionLink' user={user} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='sessionLink' to='/login'>Sign In</NavLink>
        <NavLink className='sessionLink' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav style={{backgroundColor: '#222222', color: 'white'}}>
      <div>
        <NavLink exact to="/">
          <h3 className='title' >Project</h3>
          <i class="fa-solid fa-circle-h" style={{color: '#20AA22', width: '3vw', height: '3vw'}}></i>
          <h3 className='title'>untr</h3>
        </NavLink>
      </div>
      <span style={{width: '50vw'}}>

        <h5>Express</h5>
        <h5>Sequelize</h5>
        <h5>React</h5>
        <h5>Redux</h5>
      </span>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
