import { csrfFetch } from './csrf'

const LOAD_PROJECTS = 'project/loadProjects';
const ADD_PROJECT = 'project/addProject';
const EDIT_PROJECT = 'project/editProject';
const DELETE_PROJECT = 'project/deleteProject'

const loadProjects = (projects) => {
    return {
        type: LOAD_PROJECTS,
        projects
    }
}

const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        project
    }
}

const editProject = (id, project) => {
    return {
        type: EDIT_PROJECT,
        id,
        project
    }
}

const destroyProject = (projectId) => {
    return {
        type: DELETE_PROJECT,
        projectId
    }
}

export const getProjects = () => async dispatch => {
    const response = await csrfFetch('/api/projects')
    const projects = await response.json();
    dispatch(loadProjects(projects));
    return projects;
};


export const postProject = (project) => async dispatch => {
    const response = await csrfFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project)
    });
    const newProject = await response.json();
    return await dispatch(addProject(newProject));
}

export const putProject = (project) => async dispatch => {
    const {id, title, ownerId, imageUrl, description} = project;
    const projectId = id
    const response = await csrfFetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({id: projectId, title, ownerId, imageUrl, description})
    })
    const updatedProject = await response.json();
    await dispatch(editProject(id, updatedProject))
    return updatedProject
}

export const deleteProject = (projectId) => async dispatch => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
    })
    await dispatch(destroyProject(projectId))
    .then(() => response)
}

const projectReducer = (state = {}, action) => {
    let newState;
    let projects;
    switch (action.type) {
        case LOAD_PROJECTS:
            newState = {...state}
            projects = Object.values(action.projects)
            projects.forEach(project => {
                newState[project.id] = project
            })
            return newState;
        case ADD_PROJECT:
            newState = {...state}
            newState[action.project.id] = action.project
            return newState;
        case EDIT_PROJECT:
            newState = {...state,
                        [action.id]: action.project}
            return newState;
        case DELETE_PROJECT:
            newState = {...state,
                        [action.id]: null}
            return newState;
        default:
            return state;
    }
}
export default projectReducer;
