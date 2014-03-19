class Picture < ActiveRecord::Base
  attr_accessible :ad_id, :url
  belongs_to :ad
end
