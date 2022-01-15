class CreateAmenities < ActiveRecord::Migration[5.2]
  def up
    create_table :amenities do |t|

      t.column "name", :string, :limit => 50
      t.column "capacity", :integer
      t.column "available_from", :time
      t.column "available_to", :time
      t.column "availability", :boolean, :default => true
      
      t.timestamps
    end
  end

  def down
    drop_table :amenities

  end

end
