import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from "../../store/project";
const ProjectPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])
    const projects = useSelector(state => state.project.projects)

    return (
        <div>
            {projects && projects.map((project, i) => {
                return (
                    <div key={i}>
                        <h2>{project?.title}</h2>
                        <img src={project?.imageUrl} alt={project?.title}/>
                        <h5>{project?.description}</h5>
                        <span>
                            <p>{project.User.username}</p>
                            <p>{project.updatedAt}</p>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default ProjectPage
