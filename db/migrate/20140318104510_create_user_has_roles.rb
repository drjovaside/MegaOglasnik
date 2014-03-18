class CreateUserHasRoles < ActiveRecord::Migration
  def change
    create_table :user_has_roles do |t|
      t.string :user_id
      t.string :integer
      t.string :role_id
      t.string :integer

      t.timestamps
    end
  end
end
