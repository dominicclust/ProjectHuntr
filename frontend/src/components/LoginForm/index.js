import { useState } from 'react';
import { login } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const valErrors = []
    if (!credential.length) valErrors.push('Please provide your username or email address')
    if (!password.length) valErrors.push('Please provide your password.')
    setErrors(valErrors)
    if (errors.length > 0) return;

    setErrors([]);
    return dispatch(login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign in. The </h2>
        <i className='fa-solid fa-circle-h' style={{color: 'green', width: '3vw', length: '3vw'}}></i>
        <h2>unt awaits</h2>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username or Email
        </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
