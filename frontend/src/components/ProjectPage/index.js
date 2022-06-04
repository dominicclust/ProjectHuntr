import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getProjects } from "../../store/project";
import './ProjectPage.css'

const ProjectPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
    const projectArray = Object.values(projects).reverse();

    
    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])




    return (
        <div className='container project-page'>
            {projectArray && projectArray.map((project, i) => {
                return (
                    <div key={i} className='project' onClick={()=>history.push(`projects/${project.id}`)}>
                        <div className='logo-thumb'>
                            <img src={project?.imageUrl} alt={project?.title}/>
                        </div>
                        <div className='project-details'>
                            <div className='main-details'>
                                <h2>{project?.title}</h2>
                                <h5>Submitted by {project?.User.username}</h5>
                            </div>
                            <div className='description'>
                                <h5>{project?.description}</h5>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProjectPage
