require 'digest/sha2'
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

	validates_confirmation_of :password
     
    ENCRYPT = Digest::SHA256
    has_many :sessions, :dependent => :destroy
	before_save :scrub_email
	after_save :flush_passwords

	def self.find_by_email_and_password(email,password)
	user = self.find_by_email(email)
	if user and user.endcrypted_password == ENCRYPT.hexdigest(password + user.salt)
    return user
	end
	end

	def password=(password)
		@password = password
		unless password_is_not_being_updated?
	    self.salt = [Array.new(9){rand(256).chr}.join].pack('m').chomp
        self.password = ENCRYPT.hexdigest(password + self.salt)
			
		end
	end

	private

    def scrub_email
    self.email.downcase!
    end

    def flush_passwords
    @password = @password_confirmation = nil
    end

    def password_is_not_being_updated?
    self.id and self.password.blank?
    end

end


