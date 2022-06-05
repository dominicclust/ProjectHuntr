import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Route, Link } from 'react-router-dom';
import { deleteProject, getProjects } from "../../store/projects";
import ProjectEdit from '../ProjectEdit'
import './ProjectPage.css'

const ProjectPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
    const user = useSelector(state => state.session.user)
    const projectArray = Object.values(projects).reverse();
    const ownedProjects = projectArray.filter(project => project.User.username === user.username)

    useEffect(() => {

    }, [projects, dispatch])
    return (
        <div className='container'>
            {projectArray && projectArray.map((project) => {
                return (
                    <div key={project?.id}className='project' >
                        <Link to={`/projects/${project?.id}`}>
                            <div className='logo-thumb'>
                                <img src={project?.imageUrl} alt={project?.title} style={{width: '10vw', height: '10vw'}}/>
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
                        </Link>
                        {ownedProjects.includes(project) &&
                            <div>
                                <button type='button' onClick={() => history.push(`/projects/${project.id}/edit`)}>
                                    Edit
                                </button>
                                <button type='button' onClick={() => dispatch(deleteProject(project.id))} >Delete</button>
                            </div>
                        }
                    </div>
                )})}
        </div>
    )
}

export default ProjectPage
