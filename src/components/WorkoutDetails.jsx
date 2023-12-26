import ax from 'axios'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react'

const WorkoutDetails = ({ workout, show, setShow }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(workout?.title)
  const [load, setLoad] = useState(workout?.load)
  const [reps, setReps] = useState(workout?.reps)
  const [error, setError] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  const handleUpdate = async () => {
    if (!user) {
      return
    }
    try {
      const updatedWorkout = { title, load, reps }
      console.log(updatedWorkout)
      await ax.patch(`http://localhost:4000/api/workouts/${workout._id}`, updatedWorkout, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      setError(null)
      setShow(!show)
      setIsOpen(false)

    } catch (error) {
      setError(error.response.data.error)
    }
  }

  const handleDelete = async () => {
    if (!user) {
      return
    }
    await ax.delete(`http://localhost:4000/api/workouts/${workout._id}` , {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    setShow(!show)
  }

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined update" onClick={() => setIsOpen(true)}>Update</span>
        <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
      </div>

      <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', width: "30%", transform: 'translate(-50%, -50%)', zIndex:"1", padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        <div className="create">
          <h3>Update workout</h3>

          <label>Excersize Title:</label>
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

          <button onClick={handleUpdate}>Update Workout</button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  )
}

export default WorkoutDetails