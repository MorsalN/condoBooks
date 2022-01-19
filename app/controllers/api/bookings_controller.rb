class Api::BookingsController < ApplicationController
  def show
    @booking = Booking.find(params[:id])
    render json: @booking
    
  end
end
