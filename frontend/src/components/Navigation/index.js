import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const user = useSelector(state => state.session.user)
  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <Link className='sessionLink' to='/projects/new'>
          Submit Your Project
        </Link>
        <ProfileButton className='sessionLink' user={user} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <Link className='sessionLink' to='/login'>Sign In</Link>
        <Link className='sessionLink' to="/signup">Sign Up</Link>
      </>
    );
  }

  return (
    <nav style={{backgroundColor: '#222222', color: 'white'}}>
      <div>
        <Link exact to="/"><i class="fa-solid fa-circle-h" style={{color: 'green', width: '3vw', height: '3vw'}}></i></Link>
      </div>
      <div>
        <h3 className={'title'} >ProjectHuntr</h3>
      </div>
      <span style={{width: '50vw'}}>

        <h5>Express</h5>
        <h5>Sequelize</h5>
        <h5>React</h5>
        <h5>Redux</h5>
      </span>
      <div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
