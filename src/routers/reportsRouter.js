const express = require('express');
const router = new express.Router();


router.get('/reports', (req, res) => {
    res.render('reports', {
        title: 'Reports Page',
        name: 'Jag Barpagga'
    })
})


module.exports = router;