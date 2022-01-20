class Api::AmenitiesController < ApplicationController

  def index
    @amenities = Amenity.all
    render json: @amenities
  end

  def show
  end

  def create
    amenity = Amenity.create!(:id => params["newAmenity"]["id"], :name => params["newAmenity"]["name"], :capacity => params["newAmenity"]["capacity"])

    if (amenity)
      render json: amenity
    else
      render json: amenity.errors
    end

  end

end