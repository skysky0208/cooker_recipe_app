class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :caption
      t.integer :press_time, null: false
      t.integer :preparation_time, null: false
      t.integer :servings
      t.boolean :is_activate, default: false
      t.string :image

      t.timestamps
    end
  end
end
