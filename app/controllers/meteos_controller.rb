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
    respond_to do |format|
      format.json { render json: @meteos }
      format.html
    end
  end

  # def answer
  #   @meteo = Meteo.new(meteo_params)
  #   authorize(@meteo)
  #   print @meteo.date
  #   @meteos = weather_answer(@meteo.city, Date.parse(@meteo.date.strftime('%Y%m%d')))
  #   respond_to do |format|
  #     format.json { render json: @meteos }
  #     format.html
  #   end
  # end

  private

  def meteo_params
    params.require(:meteo).permit(:city, :date)
  end

  def weather_answer(city, date)
    url = "http://api.wunderground.com/api"
    filepath = "#{url}/#{API_KEY}/history_#{date}/q/FR/#{city}.json"
    meteo_attempt = open(filepath).read
    meteo = JSON.parse(meteo_attempt)
    return meteo
  end
end
