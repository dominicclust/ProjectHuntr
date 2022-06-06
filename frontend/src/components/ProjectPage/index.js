import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, Link} from 'react-router-dom';
import { restoreUser } from '../../store/session';
import { getReviews } from '../../store/reviews';
import './ProjectPage.css'

const ProjectPage = ({projects}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const orderedProjects = Object.values(projects).reverse()
    const ownedProjects = Object.values(projects).filter(project => project.ownerId === user?.id)

    const handleClick = (projectId) => async(e) => {
        e.preventDefault();
        await dispatch(restoreUser())
        .then(() => dispatch(getReviews()))
        .then(() => history.push(`/projects/${projectId}`))
    }
    const projectMap = orderedProjects.map((project) => {
        let projectId = project.id
        return (
            <div key={projectId} id={`project${projectId}`} onClick={handleClick(projectId)} >
                <div className='project'>
                    <div className='logo-thumb'>
                        <img src={project?.imageUrl} alt={project?.title} style={{width: '10vw', height: '10vw'}}/>
                    </div>
                    <div className='project-details'>
                        <div className='main-details'>
                            <h2>{project?.title}</h2>
                            {ownedProjects.includes(projects[projectId])
                            ?   <p>click to view your project's details and reviews</p>
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
        <div className='container'>
            {projectMap}
        </div>
    )
}

export default ProjectPage;
