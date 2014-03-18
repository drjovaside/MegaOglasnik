class User < ActiveRecord::Base
  attr_accessible :adress, :banned, :city, :email, :lastlogin, :lastname, :name, :password, :string, :string, :string, :string, :string, :string, :tel_num, :username
has_many :logs
has_many :user_has_roles
has_and_belongs_to_many :roles
has_many :roles, :through => :user_has_roles
has_many :medals
end
