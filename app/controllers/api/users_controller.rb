class Api::UsersController < ApplicationController
  def index
    render :json => {
      message: "hello users - Daniel, Morsal, Kal!"
    }
  end

  def user_bookings
    @bookings = Booking.where(user_id: params[:id], amenity_id: params[:amenity_id])
    render json: @bookings

  end
end
