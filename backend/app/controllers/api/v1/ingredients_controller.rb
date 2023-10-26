class Api::V1::IngredientsController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:update]
    before_action :set_recipe

    def show
        render json: {status: 200, ingredients: @recipe.ingredients}
    end

    def update
        new_ingredients = params[:ingredients]

        @recipe.ingredients.each do |ingredient|
            unless new_ingredients.any?{|new_ingredient| new_ingredient['name'] == ingredient.name}
                ingredient.destroy
            end
        end

        new_ingredients.each do |item|
            ingredient = @recipe.ingredients.find_or_initialize_by(name: item['name'])
            ingredient.amount = item['amount']
            if not ingredient.save
                render json: { message: "保存できませんでした" , status: :internal_server_error}
            end
        end
        
        render json: {status: 200}
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
