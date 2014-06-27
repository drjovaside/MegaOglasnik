class AddSenderUsernameToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :sender_username, :string
  end
end
