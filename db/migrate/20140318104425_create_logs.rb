class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.string :user_id
      t.string :integer
      t.string :ip
      t.string :string
      t.datetime :timestamp

      t.timestamps
    end
  end
end
