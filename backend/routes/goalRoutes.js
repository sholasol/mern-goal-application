const express = require('express')

const router = express.Router()

const {getGoals, setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')
 
// router.get('/', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message: 'Get goals'})
// })

//get and create post 
router.route('/').get(getGoals).post(setGoal)

//update post with an id
router.put('/:id', updateGoal)

//delete post with an id
router.delete('/:id',deleteGoals)

module.exports = router