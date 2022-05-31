import {useState, useEffect} from 'react'
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SignupFormPage = () => {
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
    }, [username, email, password, valErrors])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirm) setValErrors('Password and Confirm Password must match')
        if (!valErrors.length) {
            dispatch(sessionActions.signup({ username, email, password }))
            return <Redirect to='/' />
        }
    }

    if (user) return (
        <Redirect to='/' />
    )

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <ul>
                    {valErrors.length > 0 && valErrors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <div>
                    <input
                        type='text'
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='email'
                        value={email}
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        value={confirm}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </div>
                <div>
                    <button disabled={valErrors.length !== 0}>Sign Up</button>
                </div>
            </form>
        </div>
    )

}
export default SignupFormPage;
