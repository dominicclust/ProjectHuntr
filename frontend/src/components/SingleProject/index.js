import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject } from '../../store/project'

const SingleProject = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();
    const project = useSelector(state => Object.values(state.projects).find(project => project.id === parseInt(projectId)))
    const user = useSelector(state => state.session.user)
    const span = () => {
        if (user.id === project.ownerId) {
            return (
                <>
                    <div>
                        <h4>Average Rating:</h4>
                        <h2>{project.avgScore}</h2>
                    </div>
                    <span>
                        <button type='button' onClick={() => history.push(`/projects/${project.id}/edit`)}>Edit</button>
                        <button type='button' onClick={() => window.alert('Are you sure? This will take your project out of the hunt, which may make some of our hunters sad. If you are okay with making our hunters sad, click OK.')
                            .then(()=> dispatch(deleteProject(project?.id)))}>Delete</button>
                    </span>
                </>
            )
        } else return (
            <span style={{boxSizing: 'border-box'}}>
                <form>
                    <label>Rate this project!</label>
                    <div>
                        <div>
                            <i className='fa-regular fa-star'></i>
                        </div>
                    </div>
                </form>
            </span>
        )
    }
    return (
        <div id='backdrop'>
            <div id='project'>
            </div>
        </div>
    )
}
export default SingleProject
