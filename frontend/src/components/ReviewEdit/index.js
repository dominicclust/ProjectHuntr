import React, {useState, useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import { putReview, getReviews } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'

const ReviewEdit = () => {
    const history = useHistory();
    const path = history.location.pathname
    const reviewId = path.split('/')[4]
    const oldReview = useSelector(state=> state.reviews[reviewId])
    console.log(oldReview)
    const dispatch = useDispatch();
    const [review, setReview] = useState(oldReview.review)
    const [rating, setRating] = useState(oldReview.rating)
    const [valErrors, setValErrors] = useState([])
    const reviewerId = oldReview.reviewerId;
    const projectId = oldReview.projectId
    useEffect(() => {
        const errors = []
        if (!rating) errors.push('Rate this project on a scale of 1 (awful) to 5(awesome).')
        if (!review.length) errors.push('Make sure to leave a detailed review! Your feedback could help improve this project.')
        setValErrors(errors)
    }, [review, rating])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setRating(parseInt(rating))
        const updatedReview = {reviewId, reviewerId, review, projectId, rating}
        return await dispatch(putReview(updatedReview))
            .then(() => dispatch(getReviews()))
            .then(() => history.push(`/projects/${projectId}`))
    }

    return (
        <div id='form'>
            <form onSubmit={handleSubmit}>
                <div id='message'>
                    <i className='fa-solid fa-circle-h' style={{height: '3vw', width: '3vw', color: '#20AA22'}}></i>
                    <h1>ow did you like this project?</h1>
                </div>
                <ul>
                    {valErrors && valErrors.map((error, i) => {
                        return <li key={i}>{error}</li>
                    })}
                </ul>

                <div style={{padding: '20px', color: 'white'}}>
                    <label htmlFor='rating'>Rate this project!</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option disabled label='select a rating below'></option>
                        <option value="1" label='1 (not so good)'></option>
                        <option value="2" label='2'></option>
                        <option value="3" label='3 (pretty okay)'></option>
                        <option value="4" label='4'></option>
                        <option value="5" label='5 (WHOA)'></option>
                    </select>
                </div>
                <div>
                    <label htmlFor='review'>Leave a review!</label>
                    <textarea
                        type='text'
                        id='review'
                        name='review'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder={review.review}
                    />
                </div>
                <div id='buttons'>
                    <button type='button' onClick={() => history.goBack()}>Cancel</button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewEdit;
