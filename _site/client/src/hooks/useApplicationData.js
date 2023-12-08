import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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
  }, []);


  // Adding the Amenity to appear on front-end
  const addAmenity = function (newAmenity) {
    return (
      axios
        .post('/api/admin/amenities', { newAmenity })
        .then(function (response) {
          // console.log('response', response.data);
          let data = response.data
          // console.log('amenities', amenities)
          setAmenities((prev) => ([...prev, data]))
        })
        .catch(function (error) {
          console.log(error);
        })
    )
  };


  return { addAmenity, amenities, setAmenities };
}
