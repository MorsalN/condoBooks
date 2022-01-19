# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Amenity.create!({
  name: 'gym',
  capacity: 10,
  available_from: '06:00',
  available_to: '22:00',
  availability: true
})

Amenity.create!({
  name: 'Social',
  capacity: 10,
  available_from: '16:00',
  available_to: '22:00',
  availability: true
})

 Booking.create!({
  title: 'My Booking1',
  user_id: 1,
  start_time: '10:00',
  end_time: '11:00',
  amenity_id: 11 ,
  date: '2022-01-20'
})

Booking.create!({
  title: 'My Booking2',
  user_id: 2,
  start_time: '12:00',
  end_time: '13:00',
  amenity_id:11 ,
  weekday: 'Friday',
  date: '2022-01-21'
})

User.create!({
  first_name: 'John',
  last_name: 'Smith',
  email: 'john.smith@gmail.com',
  phone: '111-111-111',
  unit: '007',
  admin: false,
  building_name: 'Rails'
})

User.create!({
  first_name: 'James',
  last_name: 'Nation',
  email: 'james.nation@gmail.com',
  phone: '111-111-22',
  unit: '008',
  admin: false,
  building_name: 'Rails'
})