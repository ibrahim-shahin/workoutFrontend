import { useEffect, useState } from 'react'
import ax from 'axios'
import { useNavigate } from 'react-router-dom'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const [workouts, setWorkouts] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        let response = await ax.get("http://localhost:4000/api/workouts", {
          headers: { 'Authorization': `Bearer ${users.token}` },
        });
        setWorkouts(response.data)

      } catch (error) {
        localStorage.removeItem('user')

        // dispatch logout action
        navigate('/')
        window.location.reload(false);
      }
    }
    if (users) {
      fetchWorkouts()
    }
  }, [show])

  return (
    <div className="home">
      <div className="workouts">
        {
          workouts && workouts.map((workout) => (
            <WorkoutDetails workout={workout} setShow={setShow} show={show} key={workout._id} />
          ))
        }
        {
          (workouts && Object.keys(workouts).length === 0 ) && <span> <strong>No workouts found :(</strong></span>
        }
      </div>
      <WorkoutForm setShow={setShow} show={show} />
    </div>
  )
}

export default Home