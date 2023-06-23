Rails.application.routes.draw do
  
  get "/about-us", to: "about#index", as: :about

  get "/play", to: "play#index", as: :play

  root to: "main#index"
end
