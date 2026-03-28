const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start Login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
    }),
    (req, res) => {
        res.redirect('/');
    }
);
// Logout
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;