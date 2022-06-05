import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from './store/session'
import { getProjects } from './store/projects';
import { getReviews } from './store/reviews'
import LoginForm from './components/LoginForm';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ProjectPage from './components/ProjectPage';
import ProjectForm from './components/ProjectForm';
import ProjectEdit from './components/ProjectEdit'
import SingleProject from './components/SingleProject';

function App() {

  const dispatch = useDispatch()
  const location = useLocation()
  let projectId = '';
  if (location.pathname !== '/' && typeof location.pathname.split('/')[2] === 'number') {
    projectId = location.pathname.split('/')[2]
  }
  if (typeof projectId !== 'number') projectId = '';

  const [isLoaded, setIsLoaded] = useState(false);

  const projects = useSelector(state=>state.projects)
  useEffect(() => {
    dispatch(restoreUser())
    .then(() => dispatch(getProjects()))
    .then(() => dispatch(getReviews()))
    .then(() => setIsLoaded(true));

  }, [dispatch]);



  return (
    <main>
      <div className='navigation'>
        <Navigation isLoaded={isLoaded}/>
      </div>
      <Switch>
        <Route path='/' exact>
          <ProjectPage />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path='/projects/new'>
          <ProjectForm setIsLoaded={setIsLoaded}/>
        </Route>
        <Route path='/projects/:projectId'>
          <SingleProject />
        </Route>
        <Route>
          <h2>We couldn't find the page you're looking for. :/</h2>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
