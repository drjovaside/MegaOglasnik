ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "gmail.com",
  :user_name            => "edind001@gmail.com",
  :password             => "solari22",
  :authentication       => "plain",
  :enable_starttls_auto => true
}
