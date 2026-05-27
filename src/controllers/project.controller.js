import prisma from "../config/prisma.js"

const toErrorMessage = (error) => {
    if (!error) return 'Unknown error'
    if (typeof error === 'string') return error
    if (error instanceof Error) return error.message || 'Unknown error'
    return error.message || 'Unknown error'
}

export const createProject = async (req, res) => {
    try {
        const project = req.body
        if(!project.title){
            return res.status(400).json({ message: 'Title is required' })
        }
        const newProject = await prisma.project.create({
            data: project
        })
        res.status(201).json({ message: 'Project created successfully', project: newProject })
    } catch (error) {
        console.error('Error creating project:', error)
        res.status(500).json({ message: 'Error creating project', error: toErrorMessage(error) })
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany()
        res.status(200).json({ message: 'All Projects fetched successfully', projects })
    } catch (error) {
        console.error('Error fetching projects:', error)
        res.status(500).json({ message: 'Error fetching projects', error: toErrorMessage(error) })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const {id} = req.params
        const project = await prisma.project.findUnique({
            where: {id: Number(id)}
        })
        if(!project){
            return res.status(404).json({ message: 'Project not found' })
        }
        res.status(200).json({ message: 'Project fetched successfully', project })
    } catch (error) {
        console.error('Error fetching project:', error)
        res.status(500).json({ message: 'Error fetching project', error: toErrorMessage(error) })
    }
}

export const updateProject = async (req, res) => {
    try{
const {id} = req.params
const projectData = req.body
const updatedProject = await prisma.project.update({
    where: {id: Number(id)},
    data: projectData
})
if(!updatedProject){
    return res.status(404).json({ message: 'Project not found' })
}
res.status(200).json({ message: 'Project updated successfully', project: updatedProject })
    }catch(error){
        console.error('Error updating project:', error)
        res.status(500).json({ message: 'Error updating project', error: toErrorMessage(error) })
    }
}
export const deleteProject = async (req, res) => {
    try {
        const {id} = req.params
      const project =  await prisma.project.delete({
            where: {id: Number(id)}
        })
     if(!project){
        return res.status(404).json({ message: 'Project not found' })
     }
        res.status(200).json({ message: 'Project deleted successfully' })
    } catch (error) {
        console.error('Error deleting project:', error)
        res.status(500).json({ message: 'Error deleting project', error: toErrorMessage(error) })
    }
}
