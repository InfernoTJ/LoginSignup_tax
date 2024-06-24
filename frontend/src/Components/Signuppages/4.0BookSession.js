import React from 'react'

const BookSession =(({ formData, setFormData }, ref)=> {
  return (
    <div>BookSession  

      <h2>{formData.email}</h2>
      <h2>{formData.phoneno}</h2>
      <h2>{formData.firstname}</h2>
      <h2>{formData.lastname}</h2>
      <h2>{formData.firmname}</h2>
      <h2>{formData.country}</h2>
      <h2>{formData.value}</h2>
      <h2>{formData.selectedSource}</h2>
      <ul> {formData.firmservices.map((formData)=>(<li>{formData.firmservices}</li>))}</ul>
      <h2>{formData.selectedRole}</h2> 
      <h2>{formData.url}.taxdome.com</h2>
      <h2>{formData.currency}</h2>
      <h2>{formData.password}</h2>
     
    </div>
  )
})

export default BookSession