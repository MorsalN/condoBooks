class Api::BookingsController < ApplicationController
  def show
    @booking = Booking.includes(:amenity).find(params[:id])
    render json: {booking: @booking, amenity: @booking.amenity }
  end

  def destroy
    puts params
    @deleteBooking = Booking.find params[:id]
    @deleteBooking.destroy

  end
  
  def capacity(params)
    totalBookings = Booking.where(amenity_id: params["events"]["currentAmenity"], 
    start_time: params["events"]["start"], end_time: params["events"]["end"])
    totalCount = totalBookings.count

    maxCapacity = Amenity.find(params["events"]["currentAmenity"])
    
    if totalCount < maxCapacity.capacity
      return true
    else
      false
    end

  end
  
  def create
    if(capacity(params.dup))
      puts params
        #debugger 
      booking = Booking.create!(:title => params["events"]["title"], :start_time => params["events"]["start"], 
      :end_time => params["events"]["end"], :user_id => params["id"], 
      :amenity_id => params["events"]["currentAmenity"])
      if booking
        render json: booking
      else
        render json: booking.errors
      end
    else

      render json: {message: "Error"}

    end
   
  end

end