class Api::V1::RecipesController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:create, :edit, :update]
    before_action :set_recipe, only: [:edit, :update]

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

    def update
        @recipe.title = recipe_params[:title]
        @recipe.caption = recipe_params[:caption]
        @recipe.image = recipe_params[:image] if recipe_params[:image] != nil
        @recipe.press_time = recipe_params[:press_time]
        @recipe.preparation_time = recipe_params[:preparation_time]
        @recipe.servings = recipe_params[:servings]
        @recipe.is_active = recipe_params[:is_active]

        if @recipe.save
            render json: {status: 200, id: @recipe.id}
        else
            render json: { status: 500, message: "更新に失敗しました"}
        end
    end

    private
        def set_recipe
            @recipe = Recipe.find(params[:id])
        end

        def recipe_params
            params.permit(:title, :press_time, :preparation_time, :image, :servings, :is_active, :caption)
        end

end
