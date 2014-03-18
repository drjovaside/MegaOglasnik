class Action < ActiveRecord::Base
  attr_accessible :name
  has_many :roles_has_actions
  has_and_belongs_to_many :roles
  has_many :roles, :through => :role_has_actions
end
