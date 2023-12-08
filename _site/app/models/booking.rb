class Booking < ApplicationRecord
  has_one :user
  belongs_to :amenity
end
