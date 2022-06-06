import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, postProject } from '../../store/projects';
import { useHistory } from 'react-router-dom';
import './ProjectForm.css'

const ProjectForm = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [valErrors, setValErrors] = useState([])

    const projectArray = Object.values(projects)
    const dispatch = useDispatch();


    useEffect(() => {
        const errors = [];

        if (title.length < 4 || title.length > 200) errors.push('Project title must be between 4 and 200 characters')
        if (projectArray.find(project => project.title === title)) errors.push('The title of this project has already been taken')
        if (imageUrl.length > 255) errors.push('Project image URL must be shorter than 255 characters')
        if (!description.length) errors.push('Please provide a description of your project')
        setValErrors(errors)
    }, [title, imageUrl, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ownerId = parseInt(user.id)
        const newProject = {title, ownerId, imageUrl, description};
        return await dispatch(postProject(newProject))
        .then(() => dispatch(getProjects()))
        .then(() => history.push('/'))
    }
    return (
        <div id='backdrop'>
            <div id='project-form'>
                <form onSubmit={handleSubmit}>
                    <div id='tagline'>
                        <div>
                            <h1>Think your project is </h1>
                        </div>
                        <div>
                            <i className="fa-solid fa-circle-h" style={{color: '#20AA22', width: '3vw', height: '3vw'}}></i>
                            <h1>untworthy?</h1>
                        </div>
                    </div>
                    <div id='tag-followup'>
                        <h3>We're glad you think so!*</h3>
                        <h4>
                            But before our users can scout out your project, we'll need a few details.
                            Fill out the form below, and let's put this project out in the open!
                        </h4>
                        <h5>* And we think so, too, for the record. :) Happy hunting!</h5>
                    </div>
                    <div id='errors'>
                        {valErrors && valErrors.map((error, i) => {
                            return <span key={i}>- {error}</span>
                        })}
                    </div>
                    <div id='title'>
                        <label>What's the title of your project?</label>
                        <input
                            type='text'
                            placeholder='e.g. ProjectHuntr'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div id='image-url'>
                        <label>What's the URL for your project's logo?</label>
                        <input
                            type='text'
                            placeholder='e.g. https://imgur.com/HAcpUDL (and shoutout to Imgur for the shortened URL!)'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div id='description'>
                        <label>Can you give us a description of your project?</label>
                        <textarea
                            placeholder='Describe your project here. How does it work? What did you use to build it? What can it do? What should the world know about your creation? Go ahead! Brag a little!'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div id='buttons'>
                        <button type='button' onClick={() => history.push('/')}>Call off the dogs!</button>
                        <button id='submit' type='submit'>Let the Hunt begin!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm;
