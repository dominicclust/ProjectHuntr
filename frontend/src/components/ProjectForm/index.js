import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postProject } from '../../store/project';
import { useHistory } from 'react-router-dom';
import './ProjectForm.css'

const ProjectForm = (user) => {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [valErrors, setValErrors] = useState([])
    const [postSuccess, setPostSuccess] = useState(false)

    const projects = useSelector(state => Object.values(state.projects))

    const dispatch = useDispatch();
    useEffect(() => {
        postSuccess && history.push('/projects')
    }, [postSuccess, history])

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = [];

        if (title.length < 4 || title.length > 200) errors.push('Project title must be between 4 and 200 characters')
        if (projects.find(project => project.title === title)) errors.push('The title of this project has already been taken')
        if (imageUrl.length > 255) errors.push('Project image URL must be shorter than 255 characters')
        if (!description.length) errors.push('Please provide a description of your project')

        setValErrors(errors);

        if (valErrors.length > 0) return;

        const ownerId = parseInt(user.id)
        const newProject = {title, ownerId, imageUrl, description};
        return dispatch(postProject(newProject))
            .then(()=> setPostSuccess(true))
    }
    return (
        <div>
            <h2>Think your project is ready for the hunt?</h2>
            <div>
                <h4>We're glad you think so!*</h4>
                <p>
                    But before our users can scout out your project, we'll need a few details.
                    Fill out the form below, and let's put this project out in the open!
                </p>
                <h6>* And we think so, too, for the record. :) Happy hunting!</h6>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    {valErrors.length && valErrors.map((error, i) => {
                        return <span key={i}>- {error}</span>
                    })}
                </div>
                <div>
                    <label>What's the title of your project?</label>
                    <input
                        type='text'
                        placeholder='e.g. ProjectHuntr'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>What's the URL for your project's logo?</label>
                    <input
                        type='text'
                        placeholder='e.g. https://imgur.com/HAcpUDL (and shoutout to Imgur for the shortened URL!)'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div>
                    <label>One last thing. Can you give us a description of your project?</label>
                    <textarea
                        placeholder='Describe your project here. How does it work? What did you use to build it? What can it do? What should the world know about your creation? Go ahead! Brag a little!'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows='20'
                        cols='40'
                    />
                </div>
                <button onClick={() => history.push('/')}>Call off the dogs!</button>
                <button type='submit'>Let the Hunt begin!</button>
            </form>
        </div>
    )
}

export default ProjectForm;
