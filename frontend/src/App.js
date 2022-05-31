import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from './store/session'
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  useEffect(()=> {
    dispatch(restoreUser())
  }, [dispatch])
  return (
    <main>
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
