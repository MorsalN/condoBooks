class Api::UsersController < ApplicationController
  def index
    render :json => {
      message: "hello users - Daniel, Morsal, Kal!"
    }
  end

  def user_bookings
    @booking = User.find(params[:id])
    render json: @booking.bookings.all

  end
end
