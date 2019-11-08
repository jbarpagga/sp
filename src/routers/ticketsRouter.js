const express = require('express');
const router = new express.Router();


router.get('/tickets', (req, res) => {
    res.render('tickets', {
        title: 'Tickets Page',
        name: 'Jag Barpagga'
    })
})


module.exports = router;