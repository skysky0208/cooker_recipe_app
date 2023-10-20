class Api::V1::RecipesController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:create, :edit]
    before_action :set_recipe, only: [:edit]

    def create
        recipe = Recipe.new(recipe_params)
        recipe.user_id = current_api_v1_user.id

        if recipe.save
            render json: { status: 200 , id: recipe.id }
        else 
            render json: { status: 500, message: "レシピ作成に失敗しました"}
        end
    end

    def edit
        render json: { status: 200, recipe: @recipe}
    end

    private
        def set_recipe
            @recipe = Recipe.find(params[:id])
        end

        def recipe_params
            params.permit(:title, :press_time, :preparation_time, :image)
        end

end
