class Ad < ActiveRecord::Base
  attr_accessible :description, :expirytime, :price, :rating, :sold, :timestamp, :title, :user_id
end
