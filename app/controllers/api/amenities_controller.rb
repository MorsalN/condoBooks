class Api::AmenitiesController < ApplicationController

  def index
    @amenities = Amenity.all
    render json: @amenities
  end

  def show
  end

  def create
    amenity = Amenity.create!(:name => params["name"], :capacity => params["capacity"], :availability =>params[])

    if (amenity)
      render json: amenity
    else
      render json: amenity.errors
    end

  end

end