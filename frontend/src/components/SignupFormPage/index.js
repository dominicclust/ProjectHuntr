import React, {useState, useEffect} from 'react'
import { signup } from '../../store/session'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SignupFormPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [valErrors, setValErrors] = useState([])


    useEffect(() => {
        const errors = []
        if (username.length < 4 || username.length > 30) errors.push('Username must be between 4 and 30 characters.')

        if (!email.includes('@')) errors.push('Please use a valid email address.')
        if (password.length < 8) errors.push('Password must be longer than 7 characters.')
        setValErrors(errors)
    }, [username, email, password])

    if (user) return <Redirect to='/'/>

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirm) setValErrors('Password and Confirm Password must match')
        if (!valErrors.length) {
            return dispatch(signup({ username, email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setValErrors(data.errors);
              });
        }
    }

    return (
        <div id='backdrop'>
            <div id='form'>
                <form onSubmit={handleSubmit} >
                    <div id='message'>
                        <h1>Ready to join the</h1>
                        <i className="fa-solid fa-circle-h" style={{color: '#20AA22', width: '3vw', height: '3vw'}}></i>
                        <h1>unt?</h1>
                    </div>
                    <h4>Fill out the form below, and you'll have access to all of ProjectHuntr's features!</h4>
                    <ul>
                        {valErrors.length > 0 && valErrors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <div id='username'>
                        <label>
                            Username:
                        </label>
                            <input
                                type='text'
                                value={username}
                                placeholder='something_unique'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>
                    <div id='email'>
                    <label>
                        Email Address:
                    </label>
                        <input
                            type='email'
                            value={email}
                            placeholder='i.m.awesome@projecthuntr.com'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div id='password'>
                        <label>
                            Password:
                        </label>
                            <input
                                type='password'
                                value={password}
                                placeholder='M@k3_sur3_the5e_ma+ch!'
                                onChange={(e) => setPassword(e.target.value)}
                                />
                    </div>
                    <div id='confirm-password'>
                        <label>
                            Confirm Password:
                        </label>
                            <input
                                type='password'
                                value={confirm}
                                placeholder='M@k3_sur3_the5e_ma+ch!'
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                    </div>
                    <div id='buttons'>
                        <button type='button' onClick={() => history.push('/')}>Cancel</button>
                        <button id='submit' disabled={valErrors.length !== 0} type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default SignupFormPage;
