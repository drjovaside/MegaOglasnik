class Session < ActiveRecord::Base
  attr_accessible :ip_adress, :path
  belongs_to :user
end
