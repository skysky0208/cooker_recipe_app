class Recipe < ApplicationRecord
    belongs_to :user
    has_many :ingredients
    has_many :steps

    mount_uploader :image, ImageUploader

    validates :title, presence: true, length: { minimum: 1 }
    validates :press_time, presence: true
    validates :preparation_time, presence: true

end
