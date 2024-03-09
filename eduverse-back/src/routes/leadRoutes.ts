import express from 'express';
import * as leadController from '../controllers/leadController';

const router = express.Router();

// Register for a course

router.get('/', leadController.getAllLeads);

router.post('/register', leadController.registerForCourse);

// get all registercourse
router.get('/:leadId', leadController.getAllRegisterCourse);
// Update lead status
router.put('/:leadId', leadController.updateLeadStatus);

// Search leads
router.get('/search', leadController.searchLeads);

export default router;