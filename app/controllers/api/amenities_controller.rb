class Api::AmenitiesController < ApplicationController

  def index
    @amenities = Amenity.all
    render json: @amenities
  end

  def destroy
    @amenity = Amenity.find params[:id]
    @amenity.destroy

  end

  def create
    amenity = Amenity.create!(:id => params["newAmenity"]["id"], :name => params["newAmenity"]["name"], :capacity => params["newAmenity"]["capacity"], :available_from => params["newAmenity"]["available_from"], :available_to => params["newAmenity"]["available_to"])

    if (amenity)
      render json: amenity
    else
      render json: amenity.errors
    end

  end

  def update
    @amenity = Amenity.find params[:id]
    puts params


    #make sure amnity exists, if exists then update. save, else return an error
    if @amenity.valid?
      
      @amenity.update!(capacity: params[:capacity])
      
    end


  end

end