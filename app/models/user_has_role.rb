class UserHasRole < ActiveRecord::Base
  attr_accessible :integer, :integer, :role_id, :user_id
  belongs_to :user
  belongs_to :role
end
