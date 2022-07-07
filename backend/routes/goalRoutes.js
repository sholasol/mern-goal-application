const express = require('express')

const router = express.Router()

const {getGoals, setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')

//bring in the protect route
const { protect } = require('../middleware/authMiddleware')
 
// router.get('/', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message: 'Get goals'})
// })

//get and create post && use the protect to protect the route
router.route('/').get(protect, getGoals).post(protect, setGoal)

//update post with an id
router.put('/:id', protect, updateGoal)

//delete post with an id
router.delete('/:id', protect, deleteGoals)

module.exports = router