import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import ax from 'axios'
import LINK from "../link"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)

      //send the email and passowrd to server
      const response = await ax.post(`${LINK}/api/user/signup`, { email, password })

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      navigate('/')
      window.location.reload(false);
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state

    } catch (error) {
      setError(error.response.data.error)
    }

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup