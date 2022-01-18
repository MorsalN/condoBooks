Rails.application.routes.draw do
  get 'homepage/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data

    get '/data', to: 'tests#index'
    # get '/user', to: 'users#index'
    get '/admin', to: 'amenities#show'
    post '/slot', to: 'bookings#create'
    

    resources :users, only: [:index]
    resources :amenities, only: [:show]
    resources :bookings, only: [:show, :edit]
  

    namespace :admin do
      root to: 'amenities#show'
      resources :amenities
    end


  end

  


  # get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
  #   !request.xhr? && request.format.html?
  # end

end
