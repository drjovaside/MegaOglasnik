class SessionsController < ApplicationController

  def new
  	
  end

 
  def create
     	@user = User.validate_login(params[:session][:email],params[:session][:password])
      if @user 
        if @user.active==true
        @user.lastlogin=Time.now
        @user.save
        session[:user_id]=@user.id
        @user1= User.find_by_id(session[:user_id])
         
         render json: @user
    
          flash[:notice] = (t :successfully_logged_in)          
       else
       flash[:error] = 'Niste verifikovali email adresu!'
       
     render json: @user.error
       
       end
      
      else 
        @user = User.validate_login(params[:email],params[:password])
        if @user
            render json: @user
        else
          flash[:error] = ( t :login_error)
          render json: @user.error
            end
       
     end

  end


  def destroy
    session[:user_id]=nil
    session[:language]= "default"
    flash[:notice] = (t :successfully_logged_out)
    redirect_to login_path
  end




end
