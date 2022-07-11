const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

const User = require('../models/userModel') //bring in user model to add to goals


//@desc Get goals
//@route Get /api/goals
//@access Private

const getGoals = asyncHandler(async(req, res) => {
    //getting goals from database
    //const goals = await Goal.find() //this get all the posts

    const goals = await Goal.find({user: req.user.id}) //this gets goal from a specific user
    res.status(200).json(goals) //this returns the goals
}) 




//@desc Set goals
//@route POST /api/goals
//@access Private

const setGoal = asyncHandler(async (req, res) => {
    //console.log(req.body)
    if(!req.body.text){
        //res.status(400).json({message: 'Please enter a goal'}) //using json error handling
        res.status(400)
        throw new Error('Please enter a goal')
    }
    const goal = await Goal.create({
        text: req.body.text, //creating a goal from form
        user: req.user.id //this add user to the post
    })
    res.status(200).json(goal)
})


//@desc Update goal
//@route PUT /api/goals/:id
//@access Private

const updateGoal = asyncHandler( async(req, res) => {
    //get the goal by id
    const goal = await Goal.findById(req.params.id)

    if(!goal){//throw error when goal is not found
        res.status(400)
        throw new Error('Goal not found')
    }

   // const user = await User.findById(req.user.id) //this is getting the id of user logged in

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure to get correct user goals
    if(goal.user.toString() !== req.user.id){ //make sure that user id on goal is the same as loggin user
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})


//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private

const deleteGoals = asyncHandler(async(req, res) => {
    //get goal to be deleted by its id
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //const user = await User.findById(req.user.id) //the user id have been set in the authmiddleware

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure to get correct user goals
    if(goal.user.toString() !== req.user.id){ //make sure that user id on goal is the same as loggin user
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({id: req.params.id })
})





//export the getGoals controller to make it available
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoals
}