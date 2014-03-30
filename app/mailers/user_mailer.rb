class UserMailer < ActionMailer::Base  
  default :from => "edin89@gmail.com"  
  
  def registration_confirmation(user)  
    mail(:to => user.email, :subject => "Registered")  
  end  
end  