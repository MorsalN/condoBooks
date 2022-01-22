Rails.application.routes.draw do
  get 'homepage/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data

    get '/data', to: 'tests#index'
    # get '/user', to: 'users#index'
    #get '/bookings', to: 'bookings#index'
    get '/users/:id/:amenity_id/bookings', to: 'users#user_bookings'
    post '/bookings/:id/', to: 'bookings#create'
    #user can see all amenities
    get '/users/amenities', to: 'amenities#index'
    
    resources :users, only: [:index]
    resources :amenities, only: [:index, :show]
    resources :bookings, only: :show
    

    scope :admin do
      root to: 'amenities#index'
      resources :amenities
    end

    scope 'admin' do
      resources :amenities, only: [:index, :destroy, :put]
  
    end

    # namespace :admin do
    #   resources: amenities to: ''
    #   root to: 'amenities#index'
    #   resources :amenities
    # end


  end

  


  # get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
  #   !request.xhr? && request.format.html?
  # end

end
