import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "components/Application.scss";

import axios from "axios";

export default function useApplicationData() {
  const [amenities, setAmenities] = useState([])

  

  /* 
  Use axios to make a request as a side effect and update the component when data is retrieved. When a component does not have any dependencies, but we only want it to run once, we have to pass useEffect an empty array.
  */

  useEffect(() => {
    axios
      .get(`/api/admin/amenities`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        setAmenities(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  const addAmenity = function ( newAmenity ) {
    return (
      axios
        .post('/api/admin/amenities', { newAmenity })
        .then(function (response) { 
          console.log('response', response.data);
          let data = response.data
          console.log('amenities', amenities)
          setAmenities((prev) => ([...prev, data]))
          // return setAmenities
          
        })
        .catch(function (error) {
          console.log(error);
        })
    )
  };


  return { addAmenity, amenities, setAmenities };
}
