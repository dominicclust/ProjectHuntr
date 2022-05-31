import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ user }){

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ProfileButton user={user} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav>
      <div>
        <NavLink exact to="/"><i class="fa-solid fa-circle-h" style={{color: 'green', width: '3vw', height: '3vw'}}></i></NavLink>
      </div>
      <div>
        <h3 className={'title'} >ProjectHuntr</h3>
      </div>
      <span style={{width: '50vw'}}></span>
      <div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
