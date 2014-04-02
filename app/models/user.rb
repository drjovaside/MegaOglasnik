require 'digest/sha2'
class User < ActiveRecord::Base
    attr_accessible :adress,:avatar_url, :banned, :city, :email, :firstname,:lastlogin, :lastname, :name, :password,:salt, :tel_num, :username, :active
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

	has_many :sessions

    before_save :encrypt_password

    
	#validates_confirmation_of :password
     
    ENCRYPT = Digest::SHA256

    def encrypt_password
    	self.password=ENCRYPT.hexdigest(password)
    end

    def self.validate_login(email,password)
    	user = User.find_by_email(email)
    	if user && user.password == ENCRYPT.hexdigest(password)
    		user
    	else 
    		nil
    	end
    end

#dodano
end