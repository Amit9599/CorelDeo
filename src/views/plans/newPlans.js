import React, { useState } from 'react'
import './plans.css'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const NewPlan = ({ initialData, setEditingPlan }) => {
  const [formData, setFormData] = useState(initialData || {})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/api/addPlans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast.success('Plan added successfully', { position: toast.POSITION.TOP_CENTER })
        console.log('Plan added successfully')
        setFormData({
          planName: '',
          description: '',
          price: '',
          duration: '',
          discount: '',
          status: '',
        })
      } else {
        toast.error('Error while adding plans', { position: toast.POSITION.TOP_CENTER })
        console.log('Error while adding plans')
      }
    } catch (error) {
      toast.error('Error while adding plans', { position: toast.POSITION.TOP_CENTER })
      console.log('Error while adding plans', error)
    }
    console.log(formData)
  }

  return (
    <div className="plans-container">
      {/* <h2>Create New Plan</h2> */}
      <form onSubmit={handleSubmit} className="plans-form">
        <div className="form-group">
          <label htmlFor="planName" className="form-label">
            Plan Name
          </label>
          <input
            type="text"
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount" className="form-label">
            Discounts
          </label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <label className="form-label">Status</label>
        <div className="status-radio-group">
          <label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === 'active'}
              onChange={handleChange}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === 'inactive'}
              onChange={handleChange}
            />
            Inactive
          </label>
        </div>

        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

NewPlan.propTypes = {
  initialData: PropTypes.object,
  setEditingPlan: PropTypes.func.isRequired,
}

export default NewPlan
