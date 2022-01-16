class Api::UsersController < ApplicationController
  def index
    render :json => {
      message: "hello users - Daniel, Morsal, Kal!"
    }
  end
end
