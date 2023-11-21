class Ingredient < ApplicationRecord
    belongs_to :recipe

    validates :name, presence: true
    validates :amount, presence: true

    scope :name_like, -> name {
        where(arel_table[:name].matches "%#{name}%")
    }
end
