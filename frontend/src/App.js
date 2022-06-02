import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './store/session'
import LoginForm from './components/LoginForm';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ProjectPage from './components/ProjectPage';
import ProjectForm from './components/ProjectForm';

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const user = useSelector(state => state.session.user)

  return (
    <main>
      <div className='navigation'>
        <Navigation isLoaded={isLoaded} user={user}/>
      </div>
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path='/' exact>
          <ProjectPage />
        </Route>
        <Route path='/projects/new'>
          <ProjectForm />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
