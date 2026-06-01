import prisma from '../config/prisma.js';

export const createProject = async (data) => {
    return await prisma.project.create({ data });
}

export const getAllProjects = async () => {
    return await prisma.project.findMany();
}

export const getProjectById = async (id) => {
    return await prisma.project.findUnique({ where: { id: Number(id) } });
}

export const updateProject = async (id, data) => {
    return await prisma.project.update({
        where: { id: Number(id) },
        data
    });
}

export const deleteProject = async (id) => {
    return await prisma.project.delete({ where: { id: Number(id) } });
}