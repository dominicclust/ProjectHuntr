import { useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from './store/session'
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  useEffect(()=> {
    dispatch(sessionActions.restoreUser())
  }, [dispatch])
  return (
    <main>
      <div>
        <h1>Welcome to Project Hunt</h1>
      </div>
      {!user && (
        <>
          <div>
            <NavLink to='/login'>Log In</NavLink>
          </div>
          <div>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>
        </>
        )}
      <Navigation user={user} />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
