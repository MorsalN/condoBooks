class Api::BookingsController < ApplicationController
  def show
    @booking = Booking.find(params[:id])
    render json: @booking
  end

  def create
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
   end
end