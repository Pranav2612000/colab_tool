/*Check if a board is added in users board list*/
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('config');
var fs = require('fs');
var path = require('path');

const auth = require('../auth');

const Boards = require('../models/board.model');
const UserBoards = require('../models/userboard.model');
router.post("/addboard", auth, async (req, res) => {
    console.log("req rcvd");
    let username = req.user.id;
  //TODO: Check if username has access to edit the file
    let creator = req.body.creator;
    let boardname = req.body.boardname;
    let board_list = req.body.board_list;
    let users = req.body.users;
    try {
        let doc = await Boards.findOneAndUpdate({ boardname: boardname},{usernames: users, list: board_list}, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        res.status(200).json({doc});
    } catch(err) {
        console.log(err);
        res.status(400).json({err});
    }
    
    //Check if board object exists
    /*
    const Boards = await Boards.find({username: username, boardname: boardname}).exec();
    if(Boards.length == 0) {
        let obj = new Boards({username:username, boardname:boardname, list:board_list});
        obj.save((err,data) => {
            if (err) {
                res.status(400).json({ err: 'error fetching from db' });
            } else {
                console.log(data);
                res.status(200).json({ status: 'success' ,data:data});
            }
        });
        return;
    } else {

    }
    */
})
router.post("/getboarddata", auth, async (req, res) => {
    let username = req.user.id;
    //Check if username has access to edit the file
    let creator = req.body.creator;
    if(creator == '') {
        creator = username;
    }
    let boardname = req.body.boardname;
    console.log(boardname);
    console.log(creator);
    await Boards.findOne({ boardname: boardname}, function(err, board) {
        if(err) {
            console.log(err);
            res.status(400).json({err});
            return;
        } else if(!board) {
            res.status(400).json({err: "Incorrect board name"});
            return;
        } else {
            console.log("board info sent");
            res.status(200).json(board);
            return;
        }
    });
})
router.post("/deleteboard", auth, async (req, res) => {
    let username = req.user.id;
    //Check if username has access to edit the file
    let creator = req.body.creator;
    if(creator == '') {
        creator = username;
    }
    let boardname = req.body.boardname;


    // Check if the user has access to the board - iterate through personal boards of the user
    // and delete the board if found.
    const userBoards = await UserBoards.find({username: username }).exec();
    if(userBoards.length == 0) {
      res.status(400).json({err: "No boards to delete"});
    }

    UserBoards.updateOne( {username: username}, { 
            $pull: {personalBoards: req.body.boardname} } );
    //Delete the board from board table.
  Boards.deleteOne({ boardname: boardname}, function (err) {
      if (err) {
        res.status(400).json({err: "Error deleting board"});
      } else {
        res.status(200).json({msg: "Removed from userarray."});
      }
    });
})
module.exports = router;
