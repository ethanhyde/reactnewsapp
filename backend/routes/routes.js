// Created 12/24/2024
// Express framework to handle API calls for MongoDB CRUD operations

const router = require('express').Router() 
let User = require('./userModel') // change path eventually

// GET route to fetch all users on sign on
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users)) // Returns all users in JSON
        .catch(err => res.status(400).json('Error: ' + err)); // Error otherwise
});

// Create user
router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const interests = req.body.lists || [];
    const location = req.body.location;

    // Create instance of new user
    const newUser = new User({
        userName,
        password,
        interests,
        location
    });

    // Save user to DB
    newUser.save()
        .then(() => res.json('User created!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

// Finds by ID, essentially the user
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user)) // Returns user in JSON
        .catch(err => res.status(400).json('Error: ' + err)); // Error
});

// Delete operation
router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Entry deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update operation
router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found') // Error if user can't be found
            }

            // Assign right from request body
            user.userName = req.body.userName;
            user.password = req.body.password;
            user.interests = req.body.lists || [];
            user.location = req.body.location;

            // Save to DB
            user.save()
                .then(() => res.json('User updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err)); // Returns error if any

});



module.exports = router; // Exports the router