class UsersController < ApplicationController
  #before_filter :set_locale
  before_filter :authenticate_user!, :only => [:index,:edit,:destroy]
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    if verify_recaptcha
    @user = User.new(params[:user])
    #@user.banned = false
    @user.banned=false
    @user.active=false
    respond_to do |format|
      if @user.save
        #dodano
      session[:user_id]=@user.id
      UserMailer.registration_confirmation(@user).deliver  
      
        format.html { redirect_to '/login', notice: 'User was successfully created. Please verify your email adress to complete the sign up process!' }
        format.json { render json: @user, status: :created, location: @user }
      else  
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
    else
      flash[:error] = 'Captcha nije ispravno unesena, pokusajte ponovo!'
      redirect_to new_user_path

    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(session[:user_id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

#dodano
  def activate
  @user = User.find(session[:user_id])
  @user.active=true
  @user.save
  redirect_to login_path
  flash[:notice] = "Email has been Verified."
end


end
