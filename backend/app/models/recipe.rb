class Recipe < ApplicationRecord
    belongs_to :user
    has_many :ingredients

    mount_uploader :image, ImageUploader

    validates :title, presence: true, length: { minimum: 1 }
    validates :press_time, presence: true
    validates :preparation_time, presence: true

    def update_ingredient(ingredients)
        self.ingredients.destroy_all
        ingredients.each do |ingredient|
            self.ingredients.create(name: ingredient[:name], amount: ingredient[:amount])
        end
    end
end
