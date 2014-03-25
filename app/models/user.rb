require 'digest'
class User < ActiveRecord::Base
 validates :username, :presence => true, :uniqueness => true
 validates :password, :confirmation => true
 validates :email, :presence => true, :uniqueness => true , :format => {
   :with => /@/,
   :with => /./,
   :message => 'Morate unijeti validnu email adresu!'
 }
 validates :firstname, :presence => true
 validates :lastname, :presence => true
 validates :adress, :presence => true
 validates :city, :presence => true
 
attr_accessor :password_confirmation

attr_accessible :adress, :banned, :city, :email, :firstname, :lastlogin, :lastname, :password, :tel_num, :username

def password=(password)
@password = password
if password.present?
generate_salt self.hashed_password = self.class.encrypt_password(password, salt)
end
end

def encrypt_password(password,salt)
	Digest::SHA2.hexdigest(password + "wibble" + salt)
	#self.password = Digest::MDS.hexdigest(password,salt)
end

def generate_salt
	self.salt= self.object_id.to_s + rand.to_s
	
end


def self.validate_login(email, password)
	user = User.find_by_email(email)
    if user && user.password == Digest::MDS.hexdigest(password)
		user
	else
		user=User.find_by_id(2)
	end
end

def self.authenticate(email, password)
	if user = User.find_by_email(email)
		if user.hashed_password == encrypt_password(password, user.salt)
			user
		else 
			User.find_by_id(2)
		end
	else 
		User.find_by_id(2)
	end
end



end


