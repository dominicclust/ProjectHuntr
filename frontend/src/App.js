import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session'
import LoginForm from './components/LoginForm';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ProjectPage from './components/ProjectPage';
import ProjectForm from './components/ProjectForm';
import SingleProject from './components/SingleProject';

function App() {
  const {projectId} = useParams();
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
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path='projects/:projectId'>
          <SingleProject projectId={projectId}/>
        </Route>
        <Route path='/projects/new'>
          <ProjectForm />
        </Route>
        <Route path='/' exact>
          <ProjectPage />
        </Route>
        <Route>
          <h2>We couldn't find the page you're looking for. :/</h2>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
