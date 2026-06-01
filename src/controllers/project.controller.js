import * as projectService from '../services/project.service.js';

const toErrorMessage = (error) => {
    if (!error) return 'Unknown error'
    if (typeof error === 'string') return error
    if (error instanceof Error) return error.message || 'Unknown error'
    return error.message || 'Unknown error'
}

export const createProject = async (req, res) => {
    try {
        const newProject = await projectService.createProject(req.body);
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(error.message === 'Title is required' ? 400 : 500).json({ message: 'Error creating project', error: toErrorMessage(error) });
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ message: 'All Projects fetched successfully', projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects', error: toErrorMessage(error) });
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        res.status(200).json({ message: 'Project fetched successfully', project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(error.message === 'Project not found' ? 404 : 500).json({ message: 'Error fetching project', error: toErrorMessage(error) });
    }
}

export const updateProject = async (req, res) => {
    try {
        const updatedProject = await projectService.updateProject(req.params.id, req.body);
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(error.message === 'Project not found' ? 404 : 500).json({ message: 'Error updating project', error: toErrorMessage(error) });
    }
}

export const deleteProject = async (req, res) => {
    try {
        await projectService.deleteProject(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(error.message === 'Project not found' ? 404 : 500).json({ message: 'Error deleting project', error: toErrorMessage(error) });
    }
}
