import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import NewPlan from './newPlans'
import './plans.css'

const PlanList = () => {
  const [plans, setPlans] = useState([])
  const [editingPlan, setEditingPlan] = useState(null)

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/getPlans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      } else {
        console.error('Error fetching plans:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching plans:', error.message)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const handleEdit = (id) => {
    const editedPlan = plans.find((plan) => plan._id === id)
    setEditingPlan(editedPlan)
    console.log(`Edit plan with ID ${id}`)
  }

  const handleDelete = async (planId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this plan?')
      if (!isConfirmed) {
        return
      }
      const response = await fetch(`http://localhost:8000/api/deletePlans/${planId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setPlans((prevPlan) => prevPlan.filter((plan) => plan.planId !== planId))
        console.log(`Plan with ID ${planId} deleted successfully`)
        fetchPlans()
      } else {
        const errorData = await response.json()
        console.error('Error deleting plan:', response.statusText, errorData)
      }
    } catch (error) {
      console.error('Error deleting plan:', error.message)
    }
  }

  return (
    <div className="plan-list-container">
      <h2>Plan List</h2>
      <table>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Discount</th>
            <th>Discounted Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.planName}</td>
              <td>{plan.description}</td>
              <td>{plan.price}</td>
              <td>{plan.duration}</td>
              <td>{plan.discount}</td>
              <td>{plan.discountedPrice}</td>
              <td>{plan.status}</td>
              <td>
                <button onClick={() => handleEdit(plan._id)} className="icon-button">
                  <FontAwesomeIcon icon={faEdit} className="icon-button" />
                </button>
                <button onClick={() => handleDelete(plan._id)} className="icon-button">
                  <FontAwesomeIcon icon={faTrash} className="icon-button" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPlan && <NewPlan initialData={editingPlan} setEditingPlan={setEditingPlan} />}
    </div>
  )
}

export default PlanList
