class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :ad_id
      t.integer :shopping_cart_id
      t.integer :category_id
      t.string :name

      t.timestamps
    end
  end
end
