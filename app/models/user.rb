require 'digest/sha2'
class User < ActiveRecord::Base
    attr_accessible :adress,:avatar_url, :banned, :city, :email, :firstname,:lastlogin, :lastname, :name, :password,:prefered_language, :salt, :tel_num, :username, :active
	 validates :username, :presence => true, :uniqueness => true
	 validates :password, :confirmation => true
	 validates :email, :uniqueness => true , :format => {
	   :with => /@/,
	   :with => /./,
	   :message => 'Morate unijeti validnu email adresu!'
	 }

    validates :password, :presence => true
 	validates :firstname, :presence => true
 	validates :lastname, :presence => true
 	
	has_many :sessions
 
    ENCRYPT = Digest::SHA256

    def encrypt_password
    	self.password=ENCRYPT.hexdigest(password)
    end

    def self.validate_login(email,password)
    	user = User.find_by_email(email)
    	if user && user.password == password
    		user
    	else 
    		nil
    	end
    end

#dodano
end