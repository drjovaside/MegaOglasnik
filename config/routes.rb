MegaOglasnik::Application.routes.draw do
  #get "activations/new"
  #get "activations/create"
  root :to => 'application#index'
  get "sessions/new"
  resources :users
  resources :sessions
  match '/login' => 'sessions#new'
  match '/logout' => 'sessions#destroy'
  match '/activate' => 'users#activate'

  get 'home' => 'application#index', as: 'application'
  get 'login' => 'sessions#new'

  get '/home/language/bosnian' => 'users#change_to_bosnian'
  get '/home/language/english' => 'users#change_to_english'
  get '/home/language/default' => 'users#change_to_default'

resources :dashboard
match '/dashboards' => 'dashboard#new'
resources :categories
resources :ads

get '/search' => 'ads#search'  
post '/search' => 'ads#search'

match '/test' => 'application#test'

get '/sponsored_ads' => 'ads#get_sponsored_ads'
get '/new_ads' => 'ads#get_latest_ads'
get 'ads/:id/comments/new' => 'comments#new', as: 'comments'
post 'ads/:id/comments' => 'comments#create', as: 'comments'
get 'ads/:id/comments' => 'comments#index', as: 'comments'

resources :partial_views, only: [:show]
#get 'ads/:id/comments/:idCom' => 'comments#show', as: 'comments'
#Ruta za sessije
#resources :sessions, :only => [:new, :create, :destroy]
#match 'login' => 'sessions#new'
#match 'logout' => 'sessions#destroy'
#get 'login' => 'sessions#new'
#get 'registration' => 'application#registration', as: 'application'
#get 'sessions' => 'sessions#new'

#match '/login', :controller => 'sessions', :action => 'new'
  #get "sessions/new"
  #get "users/new"


  #resources :users
  #match '/register' => 'users#new'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'users#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
