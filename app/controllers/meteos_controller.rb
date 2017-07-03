require 'open-uri'
require 'json'

class MeteosController < ApplicationController
  API_KEY = 'fbd2908be34da7b2'

  def ask
  end

  def answer
    if params[:city].present? && params[:date].present?
      @city = params[:city]
      @date = params[:date]
      @meteos = weather_answer(params[:city], Date.parse(params[:date]).strftime('%Y%m%d'))
    end
  end

  private

  def weather_answer(city, date)
    uri = "http://api.wunderground.com/api"
    filepath = "#{uri}/#{API_KEY}/history_#{date}/q/FR/#{city}.json"
    meteo_attempt = open(filepath).read
    meteo = JSON.parse(meteo_attempt)
    return meteo["history"]["observations"]
  end
end
