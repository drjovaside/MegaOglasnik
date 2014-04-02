class UserMailer < ActionMailer::Base  
  default :from => "edinrails@gmail.com"  
  
  def registration_confirmation(user)  
    mail(:to => user.email, :subject => "Registered")  
  end  
end  