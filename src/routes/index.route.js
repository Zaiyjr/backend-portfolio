import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import requireAdminKey from "../middlewares/adminKey.middleware.js";
const router = express.Router();


// routes projects

router.post('/projects', requireAdminKey, createProject)
router.get('/projects', getAllProjects)
router.get('/projects/:id', getProjectById)
router.put('/projects/:id', requireAdminKey, updateProject)
router.delete('/projects/:id', requireAdminKey, deleteProject)

// routes skills
router.post('/skills', requireAdminKey, createSkill)
router.get('/skills', getAllSkills)
router.get('/skills/:id', getSkillById)
router.put('/skills/:id', requireAdminKey, updateSkill)
router.delete('/skills/:id', requireAdminKey, deleteSkill)

// routes contacts
router.post('/contacts', requireAdminKey, createContact)
router.get('/contacts', getAllContacts)
router.get('/contacts/:id', getContactById)
router.put('/contacts/:id', requireAdminKey, updateContact)
router.delete('/contacts/:id', requireAdminKey, deleteContact)
export default router
