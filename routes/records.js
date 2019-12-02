
const express = require('express');
const router = express.Router();
const { getRecords, addRecord, deleteRecord, getRecord, putRecord } = require('../controllers/recordsController');


/**
 * GET all records
 */

 router
 .route('/')
 .get(getRecords)
 .post(addRecord)


 router
 .route('/:id')
 .get(getRecord)
 .delete(deleteRecord)
 .put(putRecord);
//.get('/', getRecords);

// /**
// * POST a record
//  */
// router.post('/', addRecord);
// /**
// * DELETE a record
//  */

// router.delete('/:id', deleteRecord);

module.exports = router;