class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
    	t.integer :ad_id
      t.integer :user_id
      t.string :user_username

      t.timestamps
    end
  end
end
