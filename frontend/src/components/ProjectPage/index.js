import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, Link} from 'react-router-dom';
import { restoreUser } from '../../store/session';
import { getReviews } from '../../store/reviews';
import './ProjectPage.css'

const ProjectPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const orderedProjects = Object.values(projects).reverse()
    const ownedProjects = Object.values(projects).filter(project => project.User.id === user?.id)
    const reviews = useSelector(state => Object.values(state.reviews))

    const handleClick = (projectId) => async(e) => {
        e.preventDefault();
        await dispatch(restoreUser())
        .then(() => dispatch(getReviews()))
        .then(() => history.push(`/projects/${projectId}`))
    }
    const projectMap = orderedProjects.map((project) => {
        const {id: projectId, ownerId, title, imageUrl, description} = project
        let projRevCount = 0
        let projAggregate = 0
        let projectReviews = Object.values(reviews).filter(review => review.projectId === projectId)
        projectReviews.forEach((review) => {
            projAggregate += review.rating
            projRevCount += 1
        })
        let projAverage = Math.fround(projAggregate/projRevCount)

        return (
            <div key={project.id} id={`project-container`} onClick={handleClick(projectId)} >
                <div className='project'>
                    <div className='logo-thumb'>
                        <img src={project?.imageUrl} alt={project?.title} style={{width: '10vw', height: '10vw'}}/>
                        {projAverage !== NaN
                        ?   (<div>
                                <h4>Avg. Score:</h4>
                                <h3>{projAverage}/5</h3>
                            </div>)
                        :   (<div style={{display: 'none'}}></div>)
                        }
                    </div>
                    <div className='project-details'>
                        <div className='main-details'>
                            <h2>{project?.title}</h2>
                            {ownedProjects.includes(projects[projectId])
                            ?   <h4>click to view your project's details and reviews</h4>
                            :   <h5>Submitted by {project?.User?.username}</h5>
                            }
                        </div>
                        <div className='description'>
                            <h5>{project?.description}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div id='backdrop'>
            {projectMap}
        </div>
    )
}

export default ProjectPage;
