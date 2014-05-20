class AdsController < ApplicationController

  before_filter :authenticate_user!, :only => [:new,:edit,:destroy]
  # GET /ads
  # GET /ads.json
  def index
    @ads = Ad.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @ads }
    end
  end

  # GET /ads/1
  # GET /ads/1.json
  def show
    @ad = Ad.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @ad }
    end
  end

  # GET /ads/new
  # GET /ads/new.json
  def new
    @categories=Category.all
    @ad = Ad.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @ad }
    end
  end

  # GET /ads/1/edit
  def edit
    @ad = Ad.find(params[:id])
  end

  # POST /ads
  # POST /ads.json
  def create
    @ad = Ad.new(params[:ad])
    @ad.user_id = session[:user_id]
    @ad.sold = false
    @ad.rating = 0 
    @ad.sponsored = false
    @ad.category_id=params[:category_id]
    respond_to do |format|
      if @ad.save
        @item=Item.new
        @item.category_id=params[:category_id]
        @item.ad_id=@ad.id
        @item.name=@ad.title
        @item.price=@ad.price
        @item.save
        format.html { redirect_to @ad, notice:  (t :ad_successfully_added) }
        format.json { render json: @ad, status: :created, location: @ad }
      else
        format.html { render action: "new" }
        format.json { render json: @ad.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /ads/1
  # PUT /ads/1.json
  def update
    @ad = Ad.find(params[:id])
    @item=Item.find_by_ad_id(@ad.ad_id)

    respond_to do |format|
      if @ad.update_attributes(params[:ad])
        format.html { redirect_to @ad, notice: (t :ad_successfully_updated) }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @ad.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ads/1
  # DELETE /ads/1.json
  def destroy
    @ad = Ad.find(params[:id])
    @ad.destroy

    respond_to do |format|
      format.html { redirect_to ads_url }
      format.json { head :no_content }
    end
  end

  def search
  
  @search = Ad.search(params[:search])
  render json: @search

  
  end

  def get_sponsored_ads
    @sponsored_ads = Ad.where(sponsored: true)

    respond_to do |format|
      format.html { redirect_to ads_url }
      format.json { render json: @sponsored_ads }
    end
  end

  def get_latest_ads
    @last_ads = Ad.last(4)

    respond_to do |format|
      format.json { render json: @last_ads }
    end
    
  end

end
