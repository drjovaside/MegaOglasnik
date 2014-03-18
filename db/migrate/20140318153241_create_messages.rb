class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_sender_id
      t.integer :reciever_sender_id
      t.string :title
      t.text :contents
      t.datetime :timestamp

      t.timestamps
    end
  end
end
