const express = require('express');
const router = new express.Router();


router.get('/timelog', (req, res) => {
    res.render('timelog', {
        title: 'Time Log',
        name: 'Jag Barpagga'
    })
})


module.exports = router;