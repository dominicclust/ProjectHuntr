import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from './store/session'
import LoginFormModal from './components/LoginForm';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ProjectPage from './components/ProjectPage';
import ProjectForm from './components/ProjectForm';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  useEffect(()=> {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <main>
      <div className='navigation'>
        <Navigation user={user} />
      </div>
      <Switch>
        <Route path='/login'>
          <LoginFormModal />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path={['/', '/projects']}>
          <ProjectPage user={user} />
        </Route>
        <Route path='/projects/new'>
          <ProjectForm user={user} />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
