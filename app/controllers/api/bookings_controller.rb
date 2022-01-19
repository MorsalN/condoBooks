class Api::BookingsController < ApplicationController
  def show
    @booking = Booking.find(params[:id])
    render json: @booking
  end

  def create
    puts params
  #   booking = Booking.create!(:titel => params['title'])
  #   if booking
  #     render json: booking
  #   else
  #     render json: booking.errors
  #   end
   end
end
