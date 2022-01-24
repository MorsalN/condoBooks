import React, {useEffect, useState} from "react";
import { useNavigate, useParams, Prompt } from "react-router-dom";
import '../css/Admin.css'
import axios from "axios";



export default function Manage() {

  const navigate = useNavigate();

  const params = useParams()
  console.log(params)

  function handleClickAdd() {
    navigate(`/${params.user_id}/add`);
  }

  
  const [amenities, setAmenities] = useState([])
  
  useEffect(() => {
    axios
    .get(`/api/admin/amenities`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        setAmenities(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      
  },[]);


  const amenities_name_list = amenities.map((room, index) => {return(<option value={room.id}>{room.name}</option>)})

  console.log("this is the name of the amenities in server:", amenities.map((room, index) => room.name ) );

  const [selectedAmenity, setSelectedAmenity] = useState(null)
  const [selectedCapacity, setSelectedCapacity] = useState(null)
  const [updatedHours, setUpdatedHours] = useState(null)


  const deleteAmenity = (amenity_id) => {

    const confirmation = window.confirm(`Are you sure you want to delete?`)
    
    if (confirmation){
      //send delete request to backend servers
      axios.delete(`/api/admin/amenities/${amenity_id}`)
      window.location.reload(true);
      navigate(-1)

      return
    } else {
      return
    }
  }
  const updateAmenity = (amenity_id, new_capacity, new_hours) => {

    const confirmation = window.confirm(`Are you sure you want to update?`)

    if (amenity_id && new_capacity && new_hours) {
      
      
      let hour = {
        1: {available_from: "9:00", available_to: "17:00"},
        2: {available_from: "00:00", available_to: "23:59"},
        3: {available_from: "05:00", available_to: "23:59"},
        4: {available_from: "00:00", available_to: "00:00"},
      }

      const data = {
        capacity: new_capacity,
        available_from: hour[new_hours].available_from,
        available_to: hour[new_hours].available_to
      }
      
      if (confirmation){
        //send delete request to backend servers
        axios.put(`/api/admin/amenities/${amenity_id}`, data)
        window.location.reload(true);
        navigate(-1)
        return
      } else {
        return
      }
    } else {
      window.alert('In order to update you must fill all 3 options')
      return
    }
  }
  
//create post request 
  return (

    <section className="Admin">
      <div className="Admin-box">
        <h1 className="Admin-title">Manage Amenities</h1>

        <table className="table">
          <tbody id="customers">
            <tr>
              <td>Select Amenity Room</td>
              <td>
                <select name="rooms" id="rooms" onChange= {(event) => setSelectedAmenity(event.target.value)}>
                  <option value="option0">Choose From Options</option> 
                  {amenities_name_list}
                </select>
              </td>
            </tr>
            <tr>
              <td>Change Times Available</td>
              <td>
                <select name="rooms" id="rooms" onChange= {(event) => setUpdatedHours(event.target.value)}>
                  <option value="option0" style={{alignText: 'center'}}>Select the following</option>
                  <option value="1">Business Hours - 9:00 to 17:00</option>
                  <option value="2">All hours - 00:00 to 23:59</option>
                  <option value="3">Early Morning/Late Night - 05:00 to 23:59</option>
                  <option value="4">Temporarily Closed - 00:00 to 00:00</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Max Capacity for Bookings (Per Hour)</td>
              <td>
              <select name="rooms" id="rooms" onChange= {(event) => setSelectedCapacity(event.target.value)}>
                  <option value="0"># of bookings</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
              </select>
                </td>
            </tr>
          </tbody>
        </table>
        <div className="edit_amenities">
          <button className="add" onClick={() => updateAmenity(selectedAmenity, selectedCapacity, updatedHours)}>Save Changes</button>
          <button className="add" onClick={() => deleteAmenity(selectedAmenity)}>Delete Amenity</button>
        </div>
        
        <button className="back" onClick={() => navigate(-1)}>Back</button>

      </div>
    </section>

  )
}