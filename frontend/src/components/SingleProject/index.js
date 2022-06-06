import React from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject, getProjects } from '../../store/projects'
import { deleteReview, getReviews } from '../../store/reviews'
import { restoreUser } from '../../store/session'

const SingleProject = () => {
    const {projectId} = useParams();
    const user = useSelector(state => state.session.user)
    const project = useSelector(state => state.projects[projectId])
    const reviews = useSelector(state => Object.values(state.reviews).filter(review => review.projectId == projectId))
    const dispatch = useDispatch();
    const history = useHistory();
    const deleteClick = async(e) => {
        e.preventDefault()
        window.alert('Are you sure? This will take your project out of the hunt, which may make some of our hunters sad. If you are okay with making our hunters sad, click OK.')
        await dispatch(restoreUser())
        .then(()=> dispatch(deleteProject(projectId)))
        .then(()=> dispatch(getProjects()))
        return history.push('/')
    }

    return (
        <div className='container'>
            <div id='project'>
                <div id='project-img' >
                    <img src={project?.imageUrl} alt={project?.title} style={{height: '15vw', width: '15vw'}} />
                </div>
                <div id='details'>
                    <h1>{project?.title}</h1>
                    <p>{project?.description}</p>
                </div>
            </div>
            <div id='between-row'>
                {user.username === project?.User.username
                ?   (
                    <span>
                        <button type='button' onClick={() => history.push(`/projects/${projectId}/edit`)}>Edit</button>
                        <button type='button' onClick={deleteClick}>Delete</button>
                    </span>
                )
                :   (
                    <span>
                        <h4 onClick={() => history.push(`/projects/${projectId}/reviews`)}>Want to leave a review for {project?.User.username}'s project? Click here</h4>
                    </span>
                )
                }
            </div>
            <div id='reviews'>
                {reviews.length > 0
                    ? (reviews.map(review => {
                        return (
                            <div key={review?.id} id='existing-review'>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: 'fit-content'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1vw'}}>
                                        <h5>{review?.User.username}'s Score:</h5>
                                        <h2>{review?.rating}/5</h2>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', padding: '0 2vw'}}>

                                        <h4>"{review?.review}"</h4>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                    {review.reviewerId === user.id
                                    ?   (<div id='buttons'>
                                            <button type='button' onClick={async(e)=> {
                                                e.preventDefault()
                                                return await history.push(`/projects/${projectId}/reviews/${review.id}/edit`)
                                            }}>Edit Review</button>
                                            <button type="button" onClick={async(e)=> {
                                                e.preventDefault();
                                                return await dispatch(deleteReview((review.id).toString()))
                                                .then(()=> dispatch(getReviews()))
                                                .then(()=> history.push(`/projects/${projectId}`))
                                            }}>Delete Review</button>
                                        </div>)
                                    : (null)
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                    }))
                    : <div>Be the first to leave a review! Click the link above!</div>
                }
            </div>
        </div>
    )
}
export default SingleProject
