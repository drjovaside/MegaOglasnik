class Log < ActiveRecord::Base
  attr_accessible :integer, :ip, :string, :timestamp, :user_id
  belongs_to :user
end
