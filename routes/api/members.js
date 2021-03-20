const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//get members api
router.get('/', (req, res) => {
    res.json(members);
});

//get single member api
router.get('/:id', (req, res) => {
    var found  = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id))); 
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    }
  
});
 
// create a member
router.post('/', (req, res) => {
    var newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        statud: 'active'
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'Please include a name and email'});
    } 
    members.push(newMember); 

    // res.json(members);  
    res.redirect('/');
})

// update member 
router.put('/:id', (req, res) => {
    var found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        var updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member Updated', member }); 
            }
        });
    }else{
        res.status(400).json({ msg: `no member with the id of ${req.params.id} found.` });
    }
});

// delete member 
router.delete('/:id', (req, res) => {
    var found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found.`});
    }
});
 


module.exports = router;
