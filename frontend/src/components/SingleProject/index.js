import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject, getProjects } from '../../store/projects'
import ReviewForm from '../ReviewForm';
import './SingleProject.css'

const SingleProject = () => {
    const {projectId} = useParams()
    const project = useSelector(state=> Object.values(state.projects).find(project => project.id == projectId))
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [showForm, setShowForm] = useState(false)
    const reviews = useSelector(state => Object.values(state.reviews).filter(review => review.projectId == projectId))

    const deleteClick = async(e) => {
        e.preventDefault()
        window.alert('Are you sure? This will take your project out of the hunt, which may make some of our hunters sad. If you are okay with making our hunters sad, click OK.')
        return await dispatch(deleteProject(projectId))
        .then(() => history.replace('/'))
        .then(() => dispatch(getProjects))
    }

    const ReviewSpan = () => {
        return (user.id === project.ownerId)
        ?   (
                <>
                    <span>
                        <button type='button' onClick={history.push(`/projects/${projectId}/edit`)}>Edit</button>
                        <button type='button' onClick={deleteClick}>Delete</button>
                    </span>
                </>
            )
        :   (
            <span style={{boxSizing: 'border-box'}} onClick={() => setShowForm(true)}>
                {showForm
                    ? <ReviewForm setShowForm={setShowForm}/>
                    : <p>Want to leave a review for {project?.User.username}'s project? Click here</p>
                }
            </span>
        )
    }
    return (
        <div id='backdrop'>
            <div id='project'>
                <img src={project?.imageUrl} alt={project?.title} />
                <h1>{project?.title}</h1>
                <p>{project?.description}</p>
            </div>
            <div id='reviews'>
                <ReviewSpan />
                {reviews && reviews?.map(review => {
                    return (
                        <>
                            <div>
                                <h6>Score:</h6>
                                <h2>{review?.rating}/5</h2>
                            </div>
                            <div>
                                <p>{review?.review}</p>
                            </div>
                            <div>
                                <h4>{review?.User.username}</h4>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default SingleProject
