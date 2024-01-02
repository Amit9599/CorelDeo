import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import './user.css'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch user details from your Express API
    fetch('http://localhost:8000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.users || []))
      .catch((error) => console.error('Error fetching users:', error))
  }, [])

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Edit user with ID ${id}`)
  }

  const handleDelete = async (userId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this user?')
      if (!isConfirmed) return

      const response = await fetch(`http://localhost:8000/api/deleteUser/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
        console.log(`User with ID ${userId} deleted successfully`)
      } else {
        const errorData = await response.json()
        console.error('Error deleting user:', response.statusText, errorData)
      }
    } catch (error) {
      console.error('Error deleting user:', error.message)
    }
  }

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            <div className="user-details">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => handleEdit(user._id)} className="icon-button edit-button">
                <FontAwesomeIcon icon={faEdit} className="icon" />
              </button>
              {/* Uncomment the delete button when needed */}
              <button onClick={() => handleDelete(user._id)} className="icon-button delete-button">
                <FontAwesomeIcon icon={faTrash} className="icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
