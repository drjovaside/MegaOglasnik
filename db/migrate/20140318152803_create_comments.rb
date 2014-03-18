class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :ad_id
      t.integer :user_id
      t.datetime :timestamp
      t.text :content

      t.timestamps
    end
  end
end
