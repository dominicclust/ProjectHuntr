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

const destroyProject = (id) => {
    return {
        type: DELETE_PROJECT,
        id
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
    const {id, title, imageUrl, description} = project;
    const response = await csrfFetch('/api/projects', {
        method: 'PUT',
        body: JSON.stringify({id, title, imageUrl, description})
    })
    const updatedProject = await response.json();
    dispatch(editProject(id, updatedProject))

}

export const deleteProject = (id) => async dispatch => {
    const response = await csrfFetch(`/api/projects/${id}`, {
        method: 'DELETE'
    })
    dispatch(destroyProject(id))
    return response;
}

const projectReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PROJECTS:
            newState = {...state}
            const projects = Object.values(action.projects)
            projects.forEach(project => {
                newState[project.id] = {...project}
            })
            return newState;
        case ADD_PROJECT:
            newState = {...state}
            newState[action.project] = action.project
            return newState;
        case EDIT_PROJECT:
            newState = {...state,
                        [action.project.id]: action.project}
            return newState;
        case DELETE_PROJECT:
            newState = {...state}
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
export default projectReducer;
