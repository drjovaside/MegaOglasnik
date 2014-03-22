class User < ActiveRecord::Base
  attr_accessible :adress, :banned, :city, :email, :firstname, :lastlogin, :lastname, :password, :tel_num, :username
end

def self.validates_login(email, password)
	user = User.find_by_email(email)

	if user && user.password == Digest::MDS.hexidest(password)
		user
	else
		nil
	end
	

end