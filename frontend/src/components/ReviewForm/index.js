import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { postReview } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'
import './ReviewForm.css'

const ReviewForm = ({project, setShowForm}) => {
    const { projectId } = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [valErrors, setValErrors] = useState([])
    const reviewerId = parseInt(user.id);

    useEffect(() => {
        const errors = []
        if (rating === 0) errors.push('Rating must be between 1 and 5 stars')
        if (!review.length) errors.push('Make sure to leave a detailed review for the project owner. Your feedback will really help them out.')
        setValErrors(errors)
    }, [review, rating])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {reviewerId, review, projectId, rating};
        await dispatch(postReview(newReview))
            .then(() => history.push(`/projects/${projectId}`))
    }
    return (
        <div id='review-form'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {valErrors && valErrors.map((error, i) => {
                        return <li key={i}>{error}</li>
                    })}
                </ul>

                <div>
                    <label htmlFor='rating'>Rate this project!</label>
                    <input type='number' value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='review'>Leave a review!</label>
                    <textarea
                        type='text'
                        id='review'
                        name='review'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Tell us what you think'
                    />
                </div>
                <div>
                    <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;
