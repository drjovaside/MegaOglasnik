class Session < ActiveRecord::Base
  attr_accessible :ip_adress, :path

  attr_accessor :email, :password, :match

  belongs_to :user

  before_validation :authenticate_user

  validates_presence_of :match,
  :message => 'for your email and password could not find user',
  :unless => :session_has_been_associated

  before_save :associate_session_to_user

private

def authenticate_user
	unless session_has_been_associated?
		self.match = User.find_by_email_and_password(self.email,self.password)
	end	
end

def associate_seesion_to_user
	self.user_id ||= drlf.match.id
end

def session_has_been_associated?
	self.user_id
	
end

end
