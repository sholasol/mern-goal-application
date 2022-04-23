const express = require('express')

const router = express.Router()

const {getGoals, setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')
 
// router.get('/', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message: 'Get goals'})
// })

//router.get('/', getGoals) //use this since controller is setup for goals

// router.post('/', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message: 'Create goals'})
// })

//router.post('/', setGoal)

//get goals and set goals routes can be merged

//this replaces the two routes above
router.route('/').get(getGoals).post(setGoal)

//update post with an id
// router.put('/:id', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message: `Update goal ${req.params.id}`})
// })

router.put('/:id', updateGoal)

//delete goal
// router.delete('/:id', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message: `Delete goal ${req.params.id}`})
// })
router.delete('/:id',deleteGoals)

module.exports = router