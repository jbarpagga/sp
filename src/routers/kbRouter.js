const express = require('express');
const router = new express.Router();


router.get('/kb', (req, res) => {
    res.render('kb', {
        title: 'Knowledge Base',
        name: 'Jag Barpagga'
    })
})


module.exports = router;