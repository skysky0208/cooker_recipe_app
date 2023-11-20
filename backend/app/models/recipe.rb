class Recipe < ApplicationRecord
    belongs_to :user
    has_many :ingredients
    has_many :steps

    mount_uploader :image, ImageUploader

    validates :title, presence: true, length: { minimum: 1 }
    validates :press_time, presence: true
    validates :preparation_time, presence: true

    def self.get_active_recipes
        Recipe.where(is_active: true)
    end

    scope :has_ingredient_name_like, -> ingredient_name {
        joins(:ingredients).merge(Ingredient.name_like ingredient_name)
    }

    scope :sort_latest, -> {order(created_at: :desc)}
    scope :sort_preparation_time, -> {order(preparation_time: :asc)}
    scope :sort_press_time, -> {order(press_time: :asc)}

end
