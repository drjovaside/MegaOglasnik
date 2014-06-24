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
        respond_to do |format|
        format.html { redirect_to ''}
        format.json { render json: @user }
        end
          flash[:notice] = (t :successfully_logged_in)          
       else
       flash[:error] = 'Niste verifikovali email adresu!'
       
     render json: @user.error
       
       end
      
      else 
        @user = User.validate_login(params[:email],params[:password])
        if @user
            if @user.active==true
        @user.lastlogin=Time.now
        @user.save
        session[:user_id]=@user.id
        @user1= User.find_by_id(session[:user_id])
        respond_to do |format|
        format.html { redirect_to ''}
        format.json { render json: @user }
        end
          flash[:notice] = (t :successfully_logged_in)          
       else
       flash[:error] = 'Niste verifikovali email adresu!'
       
     render json: @user.error
       
       end
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

def show
    unless session[:user_id].nil?
    @user=User.find(session[:user_id])
    render json: @user
    else
    render json: nil
    end
end


end
