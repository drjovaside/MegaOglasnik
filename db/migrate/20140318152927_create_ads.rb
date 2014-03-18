class CreateAds < ActiveRecord::Migration
  def change
    create_table :ads do |t|
      t.integer :user_id
      t.datetime :timestamp
      t.datetime :expirytime
      t.boolean :sold
      t.decimal :rating
      t.text :description
      t.decimal :price
      t.string :title

      t.timestamps
    end
  end
end
