import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { postReview } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'

const ReviewForm = ({setShowForm}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const project = useSelector(state => Object.values(state.projects)
        .find(project => project.id === parseInt(projectId)))
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [stars, setStars] = useState(0)
    const [valErrors, setValErrors] = useState([])
    const reviewerId = parseInt(user.id);
    const projectId = parseInt(project.id);


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
        <div id='backdrop'>
            <div id='review-form'>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {valErrors && valErrors.map((error, i) => {
                            return <li key={i}>{error}</li>
                        })}
                    </ul>
                    <label>Rate this project!</label>
                    <div value={rating} onChange={() => setRating(stars)}>
                        <div value={1} onClick={(e)=> setStars(e.target.value)}>
                            <i className={stars >= 1 ? 'fa-solid fa-star fa-med' : 'fa-regular fa-star fa-med'}></i>
                        </div>
                        <div value={2} onClick={(e)=> setStars(e.target.value)}>
                            <i className={stars >= 2 ? 'fa-solid fa-star fa-med' : 'fa-regular fa-star fa-med'}></i>
                        </div>
                        <div value={3} onClick={(e)=> setStars(e.target.value)}>
                            <i className={stars >= 3 ? 'fa-solid fa-star fa-med' : 'fa-regular fa-star fa-med'}></i>
                        </div>
                        <div value={4} onClick={(e)=> setStars(e.target.value)}>
                            <i className={stars >= 4 ? 'fa-solid fa-star fa-med' : 'fa-regular fa-star fa-med'}></i>
                        </div>
                        <div value={5} onClick={(e)=> setStars(e.target.value)}>
                            <i className={stars === 5 ? 'fa-solid fa-star fa-med' : 'fa-regular fa-star fa-med'}></i>
                        </div>
                    </div>
                    <label>Leave a review!</label>
                    <textarea
                        type='text'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Tell us what you think'
                    />
                    <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;
