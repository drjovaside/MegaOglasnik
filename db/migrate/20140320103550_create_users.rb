class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :firstname
      t.string :lastname
      t.string :adress
      t.string :city
      t.string :email
      t.string :tel_num
      t.string :password
      t.boolean :banned
      t.datetime :lastlogin

      t.timestamps
    end
  end
end
