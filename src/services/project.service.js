import * as projectRepository from '../repositories/project.repository.js';

export const createProject = async (data) => {
    if (!data.title) {
        throw new Error('Title is required');
    }
    return await projectRepository.createProject(data);
}

export const getAllProjects = async () => {
    return await projectRepository.getAllProjects();
}

export const getProjectById = async (id) => {
    const project = await projectRepository.getProjectById(id);
    if (!project) {
        throw new Error('Project not found');
    }
    return project;
}

export const updateProject = async (id, data) => {
    const existingProject = await projectRepository.getProjectById(id);
    if (!existingProject) {
        throw new Error('Project not found');
    }
    return await projectRepository.updateProject(id, data);
}

export const deleteProject = async (id) => {
    const existingProject = await projectRepository.getProjectById(id);
    if (!existingProject) {
        throw new Error('Project not found');
    }
    return await projectRepository.deleteProject(id);
}
