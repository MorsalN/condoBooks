class Api::AmenitiesController < ApplicationController

  def show
    render :json => {
      message: "This is amenities page"
    }
  end

end
