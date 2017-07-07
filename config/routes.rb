Rails.application.routes.draw do
  # get '/', to: 'meteos#ask'
  # get ''
  get 'answer', to: 'meteos#answer'
  get 'search', to: 'meteos#search'
  # get '/answer', to: 'meteos#answer'

  root 'meteos#ask'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
