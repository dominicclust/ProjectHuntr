import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = '/reviews/loadReviews'
const ADD_REVIEW = '/reviews/addReview'
const EDIT_REVIEW = '/reviews/editReview'
const REMOVE_REVIEW = '/reviews/removeReview'


const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const editReview = (id, review) => {
    return {
        type: EDIT_REVIEW,
        id,
        review
    }
}

const removeReview = (id) => {
    return {
        type: REMOVE_REVIEW,
        id
    }
}

export const getReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews')
    const data = await response.json()
    dispatch(loadReviews(data.reviews))
    return response;
}

export const postReview = (newReview) => async dispatch => {
    const {reviewerId, review, projectId, rating} = newReview
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({reviewerId, review, projectId, rating})
    })
    const data = await response.json()
    dispatch(addReview(data.review))
    return response;
}

export const putReview = (updatedReview) => async dispatch => {
    const {id, reviewerId, review, projectId, rating} = updatedReview
    const response = await csrfFetch(`/api/reviews/${id}`,  {
        method: 'PUT',
        body: JSON.stringify({reviewerId, review, projectId, rating})
    })
    const data = await response.json()
    await dispatch(editReview(data.review))
    return response;
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    await dispatch(removeReview(reviewId))
}

const reviewReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {...state};
            action.reviews.forEach(review => {
                newState[review.id] =  review
            })
            return newState;
        case ADD_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review;
            return newState;
        case EDIT_REVIEW:
            newState = {...state,
                        [action.id]: action.review}
            return newState;
        case REMOVE_REVIEW:
            newState = {...state};
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
export default reviewReducer;
