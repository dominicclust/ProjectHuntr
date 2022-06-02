import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getProjects } from "../../store/project";
import './ProjectPage.css'

const ProjectPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    const projects = useSelector(state => state.projects)
    const projectArray = Object.values(projects)
    return (
        <div className='container project-page'>
            {projectArray && projectArray.map((project, i) => {
                return (
                    <div key={i} className='project' onClick={()=> (<Redirect to={`/projects/${project.id}`}/>) }>
                        <div className='logo-thumb'>
                            <img src={project?.imageUrl} alt={project?.title}/>
                        </div>
                        <div className='project-details'>
                            <div className='main-details'>
                                <h2>{project?.title}</h2>
                                <h6>Submitted by {project.User.username}</h6>
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
