class CreateMedals < ActiveRecord::Migration
  def change
    create_table :medals do |t|
      t.integer :user_id
      t.string :name
      t.string :description
      t.string :value

      t.timestamps
    end
  end
end
