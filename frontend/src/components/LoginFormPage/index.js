// import { useState, useEffect } from "react"
// import { login } from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'

// const LoginFormPage = () => {
//     const dispatch = useDispatch()
//     const sessionUser = useSelector(state => state.session.user)
//     const [credential, setCredential] = useState('');
//     const [password, setPassword] = useState('');
//     const [valErrors, setValErrors] = useState([]);
//     const [submitted, setSubmitted] = useState(false)



//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (valErrors.length > 0) {
//             setSubmitted(false)
//             return
//         }

//         dispatch(login({ credential, password }))
//         .then(()=> <Redirect to='/' />)
//         .catch(async (res) => {
//             const data = await res.json();
//             if (data && data.errors) setValErrors(data.errors)
//         });
//     }
//     useEffect(() => {
//         const errors = []
//         if (submitted && !credential.length) errors.push('Please enter your username or email address.')
//         if (submitted && !password.length) errors.push('Please enter your password.')
//         setValErrors(errors)
//     }, [submitted, credential, password])

//     if (sessionUser) return (
//         <Redirect to='/' />
//     )

//     return (
//         <div>
//             <form onSubmit={handleSubmit} >
//                 <ul>
//                     {valErrors && valErrors?.map((error, i) => <li key={i}>{error}</li>)}
//                 </ul>
//                 <div>
//                     <input
//                         type='text'
//                         value={credential}
//                         onChange={(e) => setCredential(e.target.value)}
//                         placeholder='Username or Email Address'
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder='Password'
//                     />
//                 </div>
//                 <button type='submit' onClick={() => setSubmitted(true)}>Log In</button>
//             </form>
//         </div>
//     );
// }


// export default LoginFormPage

// frontend/src/components/LoginFormPage/index.js
import { useState } from 'react';
import { login } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
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
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
