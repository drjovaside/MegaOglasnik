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
    
 def upload_picture
  uploaded_io = params[:file]
  @ad=Ad.find(params[:id]) 
  @naziv_slike =params[:id].to_s
  @ad.picture_path = "/images/products/product" + @naziv_slike + ".jpg"
  @ad.save
    @filename = "product" + @naziv_slike
  File.delete("#{Rails.root}/public/images/products/#{@filename}") if File.exist?("#{Rails.root}/public/images/products/#{@filename}")
  File.open(Rails.root.join('public', 'images/products', "product" + @naziv_slike + ".jpg"), 'wb') do |file|
  file.write(uploaded_io.read)
  end
  
  render json: @naziv_slike
 end

  # POST /ads
  # POST /ads.json
  def create
  
    
    @ad = Ad.new(params[:ad])
#    @ad.user_id = session[:user_id]
    @ad.sold = false
    @ad.rating = 0
    @ad.ratingsum = 0
    @ad.ratingsnumber = 0
    @ad.section=params[:section]
    @ad.academic_year=params[:academic_year]
    @ad.picture_path = "/images/products/product.jpg"
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
    @item=Item.where(ad_id: @ad.id)
    respond_to do |format|
      if @ad.update_attributes(params[:ad])
        format.html { redirect_to @ad, notice: (t :ad_successfully_updated) }
        format.json { render json: @ad }
              @ad.rating=params[:rating]
              @ad.ratingsnumber+=1
              @ad.ratingsum+=@ad.rating
              @ad.rating= @ad.ratingsum / @ad.ratingsnumber
              @ad.save  
      else
        format.html { render action: "edit" }
        format.json { render json: @ad.errors, status: :unprocessable_entity }
      end
    end
  end
    
def upload_photo
  uploaded_io = params[:file]
  @ad=Ad.find(params[:id]) 
  @naziv_slike =params[:id]
  @ad.picture_path = "/images/products/product" + @naziv_slike + ".jpg"
  @ad.save
  @filename = "product" + @naziv_slike
  File.delete("#{Rails.root}/public/images/users/#{@filename}") if File.exist?("#{Rails.root}/public/images/users/#{@filename}")
  File.open(Rails.root.join('public', 'images/products', "product" + @naziv_slike + ".jpg"), 'wb') do |file|
  file.write(uploaded_io.read)
  end
  
  render json: @naziv_slike
 end
  
  # DELETE /ads/1
  # DELETE /ads/1.json
  def destroy
    @ad = Ad.find(params[:id])
    @ad.destroy
render json: 1
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


  def add_to_cart
    ad = Ad.find(params[:id])
    # @cart = Cart.new
    @cart = find_or_create_cart
    @cart.add_ad(ad)
    # session[:cart] = @cart
    redirect_to(:action => 'show_cart' )  
  end

  def show_cart
    # @cart = session[:cart]
    @cart = find_or_create_cart
  end

 private #--------------------

 def find_or_create_cart
  session[:cart] ||= Cart.new

 end

end
