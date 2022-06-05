import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { deleteProject, getOneProject, getProjects } from "../../store/projects";
import SingleProject from '../SingleProject';
import ProjectEdit from '../ProjectEdit'
import './ProjectPage.css'

const ProjectPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const projects = useSelector(state => Object.values(state.projects).reverse())
    const ownedProjects = projects.filter(project => project.ownerId === user?.id)

    const handleClick = (id) => async(e) => {
        e.preventDefault();
        history.push(`/projects/${id}`)
        console.log(history.location)
        await dispatch(getOneProject(id))
    }

    return (
        <>
            <div className='container'>
                    {projects && projects.map((project) => {
                        return (
                            <div className='project' key={project.id}>
                                <div id={`project${project.id}`} onClick={handleClick(project.id)} >
                                    <div className='logo-thumb'>
                                        <img src={project?.imageUrl} alt={project?.title} style={{width: '10vw', height: '10vw'}}/>
                                    </div>
                                    <div className='project-details'>
                                        <div className='main-details'>
                                            <h2>{project?.title}</h2>
                                            {ownedProjects.includes(project)
                                            ?   <p>click to view your project's details and reviews</p>
                                            :   <h5>Submitted by {project?.User.username}</h5>
                                        }
                                        </div>
                                        <div className='description'>
                                            <h5>{project?.description}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
            </div>
        </>
    )
}

export default ProjectPage;
