class Amenity < ApplicationRecord
  validates :name, presence: true
  validates :capacity, presence: true
  validates :available_from, presence: true
  validates :available_to, presence: true
end
