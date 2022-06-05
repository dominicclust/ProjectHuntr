const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Project, Review } = require('../../db/models')

const router = express.Router();

const validateProject = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 200 })
        .withMessage('Project Title must be between 4 and 200 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a brief description of your project.'),
    check('imageUrl')
        .isURL()
        .withMessage('Provide a valid URL for your project image.'),
        handleValidationErrors
    ];



router.get('/', asyncHandler(async (req, res) => {
    const projects = await Project.findAll({include: [User, Review], order: [['id', 'DESC']]})
    return res.json([...projects])
}))

router.get('/:projectId', asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const project = await Project.findByPk(projectId)
    return res.json({...project})
}))

router.post('/', requireAuth, validateProject, asyncHandler(async (req, res) => {
    const {title, ownerId, description, imageUrl} = req.body;
    const project = await Project.create({title, ownerId, description, imageUrl})
    return res.json(project)
}))

router.put('/:projectId', requireAuth, validateProject, asyncHandler(async (req, res) => {
    const { id, title, ownerId, description, imageUrl } = req.body;
    const updatedProject = await Project.update({title, ownerId, description, imageUrl}, {where: {id}})
    return res.json(updatedProject)
}))

router.delete('/:projectId', requireAuth, asyncHandler(async (req, res) => {
    const {projectId} = req.params
    return await Project.destroy({where: {id: projectId}})
}))

module.exports = router;
