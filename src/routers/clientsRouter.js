const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth')


router.get('/clients', (req, res) => {
    res.render('clients', {
        title: 'Clients Page',
        name: 'Jag Barpagga'
    })
})


module.exports = router;