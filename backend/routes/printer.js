const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({data: 'Here is printer data'})
})

module.exports = router;