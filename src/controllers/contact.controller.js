import prisma from "../config/prisma.js";

export const createContact = async (req, res) => {
    try {
        const contact = req.body
        const newContact = await prisma.contact.create({
            data: contact
        })
        if(!newContact.name || !newContact.email || !newContact.message){
            return res.status(400).json({ message: 'Name, email and message are required' })
        }
        if(newContact.email && !/\S+@\S+\.\S+/.test(newContact.email)){
            return res.status(400).json({ message: 'Invalid email format' })
        }
        
        res.status(201).json({ message: 'Contact created successfully', contact: newContact })
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error })
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany()
        if(contacts.length === 0){
            return res.status(404).json({ message: 'No contacts found' })
        }
        res.status(200).json({ message: 'All Contacts fetched successfully', contacts })
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error })
    }
}               

export const getContactById = async (req, res) => {
    try {
        const {id} = req.params
        const contact = await prisma.contact.findUnique({
            where: {id: Number(id)}
        })
        if(!contact){
            return res.status(404).json({ message: 'Contact not found' })
        }
        res.status(200).json({ message: 'Contact fetched successfully', contact })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact', error })
    }
}   

export const updateContact = async (req, res) => {
    try{
const {id} = req.params
const contactData = req.body
const updatedContact = await prisma.contact.update({
    where: {id: Number(id)},
    data: contactData
})
if(!updatedContact){
    return res.status(404).json({ message: 'Contact not found' })
}
res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact })
    }catch(error){
        res.status(500).json({ message: 'Error updating contact', error })
    }
}
export const deleteContact = async (req, res) => {
    try {
        const {id} =  req.params    
       const contact = await prisma.contact.delete({
            where: {id: Number(id)}
        })
        if(!contact){
            return res.status(404).json({ message: 'Contact not found' })
        }
        res.status(200).json({ message: 'Contact deleted successfully' })
    }      
     catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error })
    }
}
