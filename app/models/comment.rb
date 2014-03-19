class Comment < ActiveRecord::Base
  attr_accessible :ad_id, :content, :timestamp, :user_id
  belongs_to :user
  belongs_to :ad
end
