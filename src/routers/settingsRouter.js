const express = require('express');
const router = new express.Router();


router.get('/settings', (req, res) => {
    res.render('settings', {
        title: 'Settings Page',
        name: 'Jag Barpagga'
    })
})


module.exports = router;