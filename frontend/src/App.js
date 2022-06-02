import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session'
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

  return (
    <main>
      <div className='navigation'>
        <Navigation isLoaded={isLoaded}/>
      </div>
      <Switch>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path={['/', '/projects']}>
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
