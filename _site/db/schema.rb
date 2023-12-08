# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_15_184248) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "amenities", force: :cascade do |t|
    t.string "name", limit: 50
    t.integer "capacity"
    t.datetime "available_from"
    t.datetime "available_to"
    t.boolean "availability", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookings", force: :cascade do |t|
    t.string "title", limit: 20
    t.string "user_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.string "amenity_id"
    t.boolean "admin_id"
    t.string "weekday"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", limit: 50
    t.string "last_name", limit: 50
    t.string "email", limit: 50
    t.string "phone", default: "", null: false
    t.string "unit"
    t.boolean "admin"
    t.string "building_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
