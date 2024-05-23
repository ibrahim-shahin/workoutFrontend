import { useState } from "react"
import ax from 'axios'
import { useNavigate } from 'react-router-dom'
import LINK from "../link"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)

      const response = await ax.post(`${LINK}/api/user/login`, { email, password })

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      navigate('/')
      window.location.reload(false);
      // dispatch({type: 'LOGIN', payload: json})

    } catch (error) {
      setError(error.response.data.error)
    }

  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

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

      <button>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login