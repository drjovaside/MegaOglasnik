class ReservationsController < ApplicationController


	def create
    @reservaiton = Reservation.new
    @reservaiton.ad_id=params[:ad_id]
    @ad = Ad.find(params[:ad_id])
    @reservaiton.ad_title = @ad.title
    @reservaiton.user_id=params[:user_id]
    @reservaiton.user_username=params[:user_username]
    @reservaiton.save
    render json: @reservaiton
  end

end
