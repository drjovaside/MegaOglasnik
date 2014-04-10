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
    
    @user = User.new(params[:user])
    #@user.banned = false
    @user.banned=false
    @user.active=false
    @user.prefered_language="default"
    respond_to do |format|
      if @user.save
        if verify_recaptcha
        #dodano
      session[:user_id]=@user.id
      UserMailer.registration_confirmation(@user).deliver  
        format.html { redirect_to '/login', notice: (t :successfully_registered) }
        format.json { render json: @user, status: :created, location: @user }
        else
      flash[:error] = 'Captcha nije ispravno unesena, pokusajte ponovo!'
      redirect_to new_user_path

    end
      else  
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
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
  flash[:notice] = (t :email_verified)
end

#changes prefered language to bosnian
def change_to_bosnian
  if session[:user_id] != nil
  @user = User.find(session[:user_id])
  @user.prefered_language="bosnian"
  @user.save
  redirect_to '/home'
  #redirect_to(:back)
  else
    session[:language]="bosnian"
    redirect_to 'home'
  end
end

#changes prefered language to english
def change_to_english
  if session[:user_id] != nil
  @user = User.find(session[:user_id])
  @user.prefered_language="english"
  @user.save
  redirect_to '/home'
  #redirect_to(:back)
else
  session[:language]="english"
  redirect_to '/home'
end
end

#changes prefered language to default
def change_to_default
  if session[:user_id] != nil
  @user = User.find(session[:user_id])
  @user.prefered_language="default"
  @user.save
  redirect_to(:back)
else
  session[:language]="default"
  redirect_to users_path
end
end

end
