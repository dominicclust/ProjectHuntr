import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginForm';
import './Navigation.css';

function Navigation({ user }){

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <NavLink to='/projects/new'>
          Submit Your Project
        </NavLink>
        <ProfileButton user={user} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav style={{backgroundColor: '#222222', color: 'white'}}>
      <div>
        <NavLink exact to="/"><i class="fa-solid fa-circle-h" style={{color: 'green', width: '3vw', height: '3vw'}}></i></NavLink>
      </div>
      <div>
        <h3 className={'title'} >ProjectHuntr</h3>
      </div>
      <span style={{width: '50vw'}}>
        <NavLink to='/projects'>
          Projects
        </NavLink>
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
