const express = require('express');
const router = express.Router();

// => /flowers/ - because of the export it's enough.
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Get all Flowers'
    })
});

router.post('/', (req, res) => {
    res.status(200).json({
        message: 'Add/Create a new flowers'
    })
});

router.patch('/:flowerId', (req, res) => {
    const flowerId = req.params.flowerId
    res.status(200).json({
        message: `update Flower - ${flowerId}`
    })
});

router.delete('/:flowerId', (req, res) => {
    const flowerId = req.params.flowerId
    res.status(200).json({
        message: `delete Flower - ${flowerId}`
    })
});

module.exports = router;