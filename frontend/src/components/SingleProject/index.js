import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject, getProjects } from '../../store/projects'
import ReviewForm from '../ReviewForm';
import './SingleProject.css'

const SingleProject = ({projects}) => {
    const {projectId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [showForm, setShowForm] = useState(false)
    const project = projects[projectId]
    const reviews = useSelector(state => Object.values(state.reviews).filter(review => review.projectId == projectId))

    const deleteClick = async(e) => {
        e.preventDefault()
        window.alert('Are you sure? This will take your project out of the hunt, which may make some of our hunters sad. If you are okay with making our hunters sad, click OK.')
        return await dispatch(deleteProject(projectId))
        .then(() => history.replace('/'))
        .then(() => dispatch(getProjects))
    }

    const ReviewSpan = ({project}) => {
        return (user.id === project?.User.id)
        ?   (
            <span>
                <button type='button' onClick={history.push(`/projects/${projectId}/edit`)}>Edit</button>
                <button type='button' onClick={deleteClick}>Delete</button>
            </span>
            )
        :   (
            <span id='new-review' style={{boxSizing: 'border-box'}}>
                {showForm
                    ? <ReviewForm project={project} setShowForm={setShowForm}/>
                    : <p onClick={() => setShowForm(true)}>Want to leave a review for {project?.User.username}'s project? Click here</p>
                }
            </span>
        )
    }

    const ReviewMap = () => {
        <div id='review-map'>
        {reviews.length
        ? reviews.map(review => {
            return (
                <div key={review.id} id='existing-review'>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: 'fit-content'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <h5>{review?.User.username}'s Score:</h5>
                            <h2>{review?.rating}/5</h2>
                        </div>
                        <div>
                            <p>{review?.review}</p>
                        </div>
                    </div>
                </div>
            )
        })
        : <div>Be the first to leave a review! Click the link above!</div>
        }
        </div>
    }
    return (
        <div id='backdrop'>
            {project &&
                <div id='project'>
                    <div>
                        <img src={project?.imageUrl} alt={project?.title} style={{height: '15vw', width: '15vw'}} />
                    </div>
                    <div id='details'>
                        <h1>{project?.title}</h1>
                        <p>{project?.description}</p>
                    </div>
                </div>
            }
            <div id='reviews'>
                <ReviewSpan project={project}/>
                <ReviewMap />
            </div>
        </div>
    )
}
export default SingleProject
