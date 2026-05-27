import {prisma} from '../config/prisma.js'
import {PrismaClient} from '@prisma/client'

export class ProjectRepository {
    constructor() {
        this.prisma = new PrismaClient()
    }

    createProject = async(data) => {
        return await prisma.create({
            data
        })
    }
    getAllProjects = async() => {
        return await prisma.findMany()
    }
    getProjectById = async(id) => {
        return await prisma.findUnique({
            where: {id}
        })
    }
    updateProject = async(id, data) => {
        return await prisma.update({
            where: {id},
            data
        })
    }
    deleteProject = async(id) => {
        return await prisma.delete({
            where: {id}
        })
    }
}