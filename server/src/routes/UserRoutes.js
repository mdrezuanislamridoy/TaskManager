
const express = require('express');
const User = require('../model/userModel');
const app = express();

const UserRouter = express.Router();



UserRouter.get('/user/:uid', function(req, res) {
    let uid = req.params.uid ;
    User.findOne({_id : uid}).then((user) => {
        res.send(user)
    })
})

UserRouter.post('/user/logout', function(req, res) {
    let uid = req.headers.uid ;
    User.findOne({_id : uid}).then((user) => {
        user.token = ""
        user.save()
        res.send(user)
    })
})

module.exports = UserRouter;