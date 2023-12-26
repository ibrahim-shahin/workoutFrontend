import { useState } from "react"
import ax from 'axios'


const WorkoutForm = ({show,setShow}) => {
  
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const workout = {title, load, reps}
      const users = JSON.parse(localStorage.getItem('user'))
  
      await ax.post('http://localhost:4000/api/workouts/' ,workout,{ headers: {
        'Authorization': `Bearer ${users.token}`
      }})
     
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setShow(!show)
     
    } catch (error) {
      setError(error.response.data.error)
    }
   

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excercise Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm