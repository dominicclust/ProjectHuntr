import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putProject } from '../../store/project';
import { useHistory, useParams } from 'react-router-dom';
import './ProjectEdit.css'

const ProjectEdit = () => {
    const { projectId } = useParams()
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const project = useSelector(state => state.project.id === parseInt(projectId))
    const [title, setTitle] = useState(project.title);
    const [imageUrl, setImageUrl] = useState(project.imageUrl);
    const [description, setDescription] = useState(project.description);
    const [valErrors, setValErrors] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        const errors = [];

        if (title.length < 4 || title.length > 200) errors.push('Project title must be between 4 and 200 characters')
        if (imageUrl.length > 255) errors.push('Project image URL must be shorter than 255 characters')
        if (!description.length) errors.push('Please provide a description of your project')
        setValErrors(errors)
    }, [title, imageUrl, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ownerId = parseInt(user.id)
        const updatedProject = {title, ownerId, imageUrl, description};
        await dispatch(putProject(updatedProject)).then(() => history.push('/'))
    }
    return (
        <div id='backdrop'>
            <div id='project-form'>
                <form onSubmit={handleSubmit}>
                    <div id='tagline'>
                        <div>
                            <h1>Keep your project up to date, get </h1>
                        </div>
                        <div>
                            <i className="fa-solid fa-circle-h" style={{color: '#20AA22', width: '3vw', height: '3vw'}}></i>
                            <h1>unted faster!</h1>
                        </div>
                    </div>
                    <div id='tag-followup'>
                        <h4>
                            You're off to a great start! Use the form below to make any edits as you see fit,
                            along with more details about your project if possible (the more you stand out, the quicker you're hunted!).
                        </h4>
                    </div>
                    <div id='errors'>
                        {valErrors && valErrors?.map((error, i) => {
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
