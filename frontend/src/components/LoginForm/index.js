import { useState, useEffect } from 'react';
import { login } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';


function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const valErrors = []
    if (!credential.length) valErrors.push('Please provide your username or email address')
    if (!password.length) valErrors.push('Please provide your password.')
    setErrors(valErrors)
  }, [credential, password])

  if (user) return <Redirect to='/' />

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    };

  return (
    <div id='backdrop'>
      <div id='form'>
        <form onSubmit={handleSubmit}>
          <div id='message'>
            <h1>Sign in. The </h1>
            <i className='fa-solid fa-circle-h' style={{color: 'green', width: '3vw', height: '3vw'}}></i>
            <h1>unt awaits</h1>
          </div>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div id='credential'>
            <label>
              Username or Email
            </label>
            <input
              type="text"
              value={credential}
              placeholder='e.g. "projectHuntr" or "i.m.awesome@projectHuntr.com"'
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div id='password'>
            <label>
              Password
            </label>
              <input
                type="password"
                value={password}
                placeholder='*insert sequence of dots here*'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
          <div id='buttons'>
            <button id='cancel' type='button' onClick={()=> history.push('/')}>Cancel</button>
            <button id='submit' type="submit" disabled={!!errors.length}>Log In</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
