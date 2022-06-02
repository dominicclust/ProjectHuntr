import { useState, useEffect } from 'react';
import { login } from '../../store/session'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const valErrors = []
    if (!credential.length) valErrors.push('Please provide your username or email address')
    if (!password.length) valErrors.push('Please provide your password.')
    setErrors(valErrors)
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ credential, password }))
      .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    };

  return (
    <div id='backdrop'>
      <div id='login-form'>
        <form onSubmit={handleSubmit}>
          <div id='message'>
            <h2>Sign in. The </h2>
            <i className='fa-solid fa-circle-h' style={{color: 'green', width: '3vw', height: '3vw'}}></i>
            <h2>unt awaits</h2>
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
          <button type="submit" disabled={!!errors.length}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
