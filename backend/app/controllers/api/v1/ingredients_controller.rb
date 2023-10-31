class Api::V1::IngredientsController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:update]
    before_action :set_recipe

    def show
        render json: {status: 200, ingredients: @recipe.ingredients}
    end

    def update
        new_ingredients = params[:ingredients]

        ActiveRecord::Base.transaction do
            new_ingredient_ids = new_ingredients.map { |item| item['id'] }.compact
            
            @recipe.ingredients.where.not(id: new_ingredient_ids).each do |ingredient|
                ingredient.destroy!
            end

            new_ingredients.each do |item|
                if item['id'].blank?
                    ingredient = Ingredient.new(name: item['name'], amount: item['amount'])
                    ingredient.recipe_id = @recipe.id
                    if not ingredient.save!
                        render json: { message: "保存できませんでした" , status: :internal_server_error}
                        return
                    end
                else
                    ingredient = Ingredient.find(item['id'])
                    if not ingredient.update!(name: item['name'], amount: item['amount'])
                        render json: { message: "保存できませんでした" , status: :internal_server_error}
                        return
                    end
                end
            end
            
            render json: {status: 200, ingredients: @recipe.ingredients}
        end
    end

    private
        def set_recipe
            @recipe = Recipe.find_by(id: params[:recipe_id])
            if !@recipe
                render json: { error: 'レシピが見つかりません' , status: 404}
            end
        end

        def recipe_params
            params.permit(:ingredients)
        end
end
