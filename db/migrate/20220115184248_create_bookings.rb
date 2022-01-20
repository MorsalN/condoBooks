class CreateBookings < ActiveRecord::Migration[5.2]
  def up
    create_table :bookings do |t|

      t.column "user_id", :string, :limit => 50
      t.column "title", :string, :limit => 20
      t.column "start_time", :datetime
      t.column "end_time", :datetime
      t.column "amenity_id", :string
      t.column "admin_id", :boolean
      t.column "weekday", :string
      t.column "date", :datetime


      t.timestamps
    end
  end

  def down
    drop_table :users
  end

end
