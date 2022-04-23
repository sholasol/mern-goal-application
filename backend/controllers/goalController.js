const asyncHandler = require('express-async-handler')
//@desc Get goals
//@route Get /api/goals
//@access Private

const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get goals'})
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
    res.status(200).json({message: 'Goal created successfully'})
})


//@desc Update goal
//@route PUT /api/goals/:id
//@access Private

const updateGoal = asyncHandler( async(req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})


//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private

const deleteGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})





//export the getGoals controller to make it available
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoals
}