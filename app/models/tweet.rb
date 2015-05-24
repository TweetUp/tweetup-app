class Tweet < ActiveRecord::Base
  acts_as_taggable
  scope :with_location_data, -> { where.not(lat: nil) }
end
