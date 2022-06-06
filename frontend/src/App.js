import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
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
import './App.css'
import ReviewForm from './components/ReviewForm';
import ReviewEdit from './components/ReviewEdit';

function App() {

  const dispatch = useDispatch()
  const location = useLocation()

  const [isLoaded, setIsLoaded] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [project, setProject] = useState();
  const projects = useSelector(state => state.projects)
  const reviews = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(restoreUser())
    .then(() => dispatch(getProjects()))
    .then(() => dispatch(getReviews()))
    .then(() => setIsLoaded(true));

  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' && typeof location.pathname.split('/')[2] === 'number') {
      setProjectId(location.pathname.split('/')[2])
      setProject(projects[projectId])
    }
  }, [location, projects, projectId, project])



  return (
    <>
      <div className='navigation'>
        <Navigation isLoaded={isLoaded}/>
      </div>
      <div className='under-navigation'>
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
            <ProjectForm />
          </Route>
          <Route path='/projects/:projectId/edit'>
              <ProjectEdit />
          </Route>
          <Route path='/projects/:projectId/reviews/:reviewId/edit'>
              <ReviewEdit />
          </Route>
          <Route path='/projects/:projectId/reviews'>
              <ReviewForm />
          </Route>
          <Route path='/projects/:projectId'>
            <SingleProject />
          </Route>
          <Route>
            <h2>We couldn't find the page you're looking for. :/</h2>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
