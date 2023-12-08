class CreateUsers < ActiveRecord::Migration[5.2]
  def up
    create_table :users do |t|
      
      t.column "first_name", :string, :limit => 50
      t.column "last_name", :string, :limit => 50
      t.column "email", :string, :limit => 50
      t.column "phone", :string, :default => '', :null => false
      t.column "unit", :string
      t.column "admin", :boolean
      t.column "building_name", :string

      t.timestamps
    end
  end

  def down
    drop_table :users
  end

end
