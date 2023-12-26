import { Link , useNavigate } from 'react-router-dom'



const Navbar = () => {
 
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('user'))

  const handleClick = () => {
    localStorage.removeItem('user')

    // dispatch logout action
    navigate('/')
    window.location.reload(false); 
  }
  
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {users && (
            <div>
              <span>{users.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!users && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar