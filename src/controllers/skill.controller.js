import prisma from "../config/prisma.js";

const toErrorMessage = (error) => {
    if (!error) return 'Unknown error'
    if (typeof error === 'string') return error
    if (error instanceof Error) return error.message || 'Unknown error'
    return error.message || 'Unknown error'
}

export const createSkill = async (req, res) => {
    try {
        const skill = req.body
        if(!skill.name || !skill.tool){
            return res.status(400).json({ message: 'Name and tool are required' })
        }
        const newSkill = await prisma.skill.create({
            data: skill
        })
        if(!newSkill){
            return res.status(400).json({ message: 'Failed to create skill' })
        }
        res.status(201).json({ message: 'Skill created successfully', skill: newSkill })
    } catch (error) {
        console.error('Error creating skill:', error)
        res.status(500).json({ message: 'Error creating skill', error: toErrorMessage(error) })
    }
}

export const getAllSkills = async (req, res) => {
    try {
        const skills = await prisma.skill.findMany()
        res.status(200).json({ message: 'All Skills fetched successfully', skills })
    } catch (error) {
        console.error('Error fetching skills:', error)
        res.status(500).json({ message: 'Error fetching skills', error: toErrorMessage(error) })
    }
}               

export const getSkillById = async (req, res) => {
    try {
        const {id} = req.params
        const skill = await prisma.skill.findUnique({
            where: {id: Number(id)}
        })
        if(!skill){
            return res.status(404).json({ message: 'Skill not found' })
        }
        res.status(200).json({ message: 'Skill fetched successfully', skill })
    } catch (error) {
        console.error('Error fetching skill:', error)
        res.status(500).json({ message: 'Error fetching skill', error: toErrorMessage(error) })
    }
}

export const updateSkill = async (req, res) => {
    try{
const {id} = req.params
const skillData = req.body
const updatedSkill = await prisma.skill.update({
    where: {id: Number(id)},
    data: skillData
})
if(!updatedSkill){
    return res.status(404).json({ message: 'Skill not found' })
}
res.status(200).json({ message: 'Skill updated successfully', skill: updatedSkill })
    }catch(error){
        console.error('Error updating skill:', error)
        res.status(500).json({ message: 'Error updating skill', error: toErrorMessage(error) })
    }
}
export const deleteSkill = async (req, res) => {
    try {
        const {id} =  req.params        
       const skill = await prisma.skill.delete({
            where: {id: Number(id)}
        })
        if(!skill){
            return res.status(404).json({ message: 'Skill not found' })
        }
        res.status(200).json({ message: 'Skill deleted successfully' })
    } catch (error) {
        console.error('Error deleting skill:', error)
        res.status(500).json({ message: 'Error deleting skill', error: toErrorMessage(error) })
    }
}
