Rails.application.routes.draw do
  post '/refresh', to: 'shop#refresh'
  post '/slot1', to: 'shop#buy_slot_1'
  post '/slot2', to: 'shop#buy_slot_2'
  post '/slot3', to: 'shop#buy_slot_3'
  post '/slot4', to: 'shop#buy_slot_4'
  post '/slot5', to: 'shop#buy_slot_5'
 
  get "/about-us", to: "about#index", as: :about

  get "/play", to: "play#index", as: :play

  root to: "main#index"
end
