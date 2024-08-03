# frozen_string_literal: true

Rails.application.routes.draw do
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  draw :sidekiq
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  defaults format: :json do
    resources :tasks, except: %i[new edit], param: :slug
    resources :users, only: %i[index create show update]
    resource :session, only: [:create, :destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
