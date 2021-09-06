const express = require('express');
const router = express.Router();
const members = require("../../Members"); // our hardcoded members json
const uuid = require('uuid');


// route that gets all members
router.get("/", (req, res) => {
    // used to send json. You do not have to use stringify (method already takes care of it)
    res.json(members);
});

// Get Single Member
router.get('/:id', (req, res) => {
    // members  library
    // some() method returns the elements of an array that meet the condition specified in a callback function.
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        // send a custom http status response and tack in custom essage. Note: 400 code is 'bad request'
        res.status(400).json({ msg: `No member found with the id of ${req.params.id}`})
    }

    // res.json(members.filter(member => member.id === parseInt(req.params.id)));
})

// Create Member
router.post('/', (req, res) => {
    //res.send(req.body);

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // Make sure that the name and email are sent with reques 
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }
    members.push(newMember);
    // res.json(members); // Used for debugging. Outputs the changes to the array
    res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
    // check if member is found on our hardcoded json db
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                // Use ternerary operator to check if just email/name was sent with the request
                member.name = updMember.name ?  updMember.name : member.name;
                member.email = updMember.email ?  updMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        });
    } else {
        // send a custom http status response and tack in custom essage. Note: 400 code is 'bad request'
        res.status(400).json({ msg: `No member found with the id of ${req.params.id}`})
    }

    // res.json(members.filter(member => member.id === parseInt(req.params.id)));
})


// Delete Member
// Get Single Member
router.delete('/:id', (req, res) => {
    // some() method returns the elements of an array that meet the condition specified in a callback function.
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({ 
        msg: 'Member deleted successfully', 
        members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        // send a custom http status response and tack in custom essage. Note: 400 code is 'bad request'
        res.status(400).json({ msg: `No member found with the id of ${req.params.id}`})
    }
})


module.exports = router;