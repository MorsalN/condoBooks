import React from "react";
import { Redirect } from "react-router-dom";
import './css/User.css'


export default function Homepage() { 
    return (
      <section className="User">
      <div className="User-box">
        <h1 className="User-title">Amenitiy Booking</h1>

        <div className="how-book">
          <h1>How to Book:</h1>

          <div>
          <div class="numberCircle">1</div>
          <div class="numberCircle">2</div>
          <div class="numberCircle">3</div>
          </div>

          

        </div>
      

      </div>
    </section>

    )
}