import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";


import requireAdminKey from "../middlewares/adminKey.middleware.js";
const router = express.Router();


// routes projects

router.post('/projects', requireAdminKey, createProject)
router.get('/projects', getAllProjects)
router.get('/projects/:id', getProjectById)
router.put('/projects/:id', requireAdminKey, updateProject)
router.delete('/projects/:id', requireAdminKey, deleteProject)




export default router
