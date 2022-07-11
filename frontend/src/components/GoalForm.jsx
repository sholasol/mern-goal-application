import {useState} from 'react'
import { useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    dispatch(createGoal({text})) //this call create goal function with the text value
    setText('')//this would set the text back to empty
  }
  return <section className='form'>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="">Goal</label>
        <input type="text" name='text' id='text' value={text}
        onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="form-group">
        <button type='submit' className='btn btn-block'>Add Goal</button>
      </div>
    </form>
  </section> 
}

export default GoalForm