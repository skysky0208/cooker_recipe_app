class Step < ApplicationRecord
    belongs_to :recipe

    validates :order, presence: true
    validates :description, presence: true
end
