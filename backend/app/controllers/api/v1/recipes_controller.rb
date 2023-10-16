class Api::V1::RecipesController < ApplicationController
    before_action :authenticate_api_v1_user!

    def create
        recipe = Recipe.new(recipe_params)
        recipe.user_id = current_api_v1_user.id

        if recipe.save
            render json: { status: 200 }
        else 
            render json: { status: 500, message: "レシピ作成に失敗しました"}
        end
    end

    private
        def recipe_params
            params.permit(:title, :press_time, :preparation_time)
        end

end
