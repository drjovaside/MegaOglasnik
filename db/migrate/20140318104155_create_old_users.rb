class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :string
      t.string :name
      t.string :string
      t.string :lastname
      t.string :string
      t.string :email
      t.string :string
      t.string :adress
      t.string :string
      t.string :city
      t.string :string
      t.string :tel_num
      t.string :password
      t.boolean :banned
      t.datetime :lastlogin

      t.timestamps
    end
  end
end
