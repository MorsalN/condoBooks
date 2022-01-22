# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Amenity.create!({
  name: 'Gym Room',
  capacity: 2,
  available_from: 'Fri Jan 21 2022 20:04:01 GMT-0600 (CST)',
  available_to: 'Mon Jan 2 2023 20:04:01 GMT-0600 (CST)',
  availability: true
})

Amenity.create!({
  name: 'Social Room',
  capacity: 10,
  available_from: 'Fri Jan 21 2022 20:04:01 GMT-0600 (CST)',
  available_to: 'Mon Jan 2 2023 20:04:01 GMT-0600 (CST)',
  availability: true
})

 Booking.create!({
  title: 'My Booking1',
  user_id: 1,
  start_time: 'Fri Jan 21 2022 20:04:01 GMT-0600 (CST)',
  end_time: 'Fri Jan 21 2022 21:04:01 GMT-0600 (CST)',
  amenity_id: 1 ,
  weekday: 'Fri Jan 21 2022 21:04:01 GMT-0600 (CST)',
  date: 'Fri Jan 21 2022 21:04:01 GMT-0600 (CST)'
})

Booking.create!({
  title: 'My Booking2',
  user_id: 2,
  start_time: 'Sat Jan 22 2022 19:04:01 GMT-0600 (CST)',
  end_time: 'Sat Jan 22 2022 21:04:01 GMT-0600 (CST)',
  amenity_id:2 ,
  weekday: 'Fri Jan 21 2022 21:04:01 GMT-0600 (CST)',
  date: 'Fri Jan 21 2022 21:04:01 GMT-0600 (CST)'
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