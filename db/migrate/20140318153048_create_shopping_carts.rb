class CreateShoppingCarts < ActiveRecord::Migration
  def change
    create_table :shopping_carts do |t|
      t.integer :user_id
      t.datetime :timestamp
      t.boolean :payed
      t.boolean :saved

      t.timestamps
    end
  end
end
