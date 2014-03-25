class CreateSessions < ActiveRecord::Migration
 
 def change
    
create_table :sessions do |t|

t.belongs_to :user      
t.string :ip_adress
      
t.string :path

      
t.timestamps
    
end
  
end

end
