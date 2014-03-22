class User < ActiveRecord::Base
  attr_accessible :adress, :banned, :city, :email, :firstname, :lastlogin, :lastname, :password, :tel_num, :username
require 'Digest'
def encrypt_password
	self.password = Digest::MDS.hexdigest(password)
end


def self.validate_login(email, password)
	user = User.find_by_email(email)

	
end


end


