import React, { Component,  useEffect, useState } from "react";
import { Redirect, useNavigate, useParams } from "react-router-dom";
import '../css/Admin.css'
import axios from "axios";


export default function Amenities(props) {
  const navigate = useNavigate();

  const params = useParams()

  function handleClickManage() {
    navigate(`/${params.user_id}/manage`);

  }

  
  function handleClickAdd() {
    navigate(`/${params.user_id}/add`);
  }
  
  // const [amenities, setAmenities] = useState([])


  // useEffect(() => {
  //   axios
  //     .get(`/api/admin/amenities`) // You can simply make your requests to "/api/whatever you want"
  //     .then((response) => {
  //       setAmenities(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },[]);

  console.log("props.amenities", props.amenities[0])
      
  const returnedAmenities = props.amenities[0] ? props.amenities.map(
    (room, index) => {
      // console.log('room',room)
      return(
      <tr key={`Room-${index}`}>
      <td>{room.name}</td>
      <td>{room.available_from.substring((room.available_from).indexOf("T") + 1, (room.available_from).lastIndexOf(":") )}</td>
      <td>{room.available_to.substring((room.available_to).indexOf("T") + 1, (room.available_to).lastIndexOf(":") )}</td>
      <td>{room.availability ? "All Days" : "Closed"}</td>
      <td>{room.capacity}</td>
      <td><button className="manage" onClick={handleClickManage}>Manage Amenity</button></td>
      </tr>)

    }
  ) : []

  return (

    <section className="Admin">
      <div className="Admin-box">
        <h1 className="Admin-title">Current Amenities</h1> 

          <table className="table">
            <tbody id="customers">
              <tr>
                <th>Room</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Capacity</th>
                <th></th>
              </tr>
              {returnedAmenities}
            </tbody>
          </table>

          <button className="add" onClick={handleClickAdd}>Add Amenity</button>
          {/* <button onClick={() => navigate(-1)}>Go back</button> */}


      </div>
    </section>

  )

}
