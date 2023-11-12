class Api::V1::RecipesController < ApplicationController
    include Pagination
    before_action :authenticate_api_v1_user!, only: [:create, :edit, :update, :delete]
    before_action :set_recipe, only: [:edit, :show, :update]

    def create
        recipe = Recipe.new(recipe_params)
        recipe.user_id = current_api_v1_user.id

        if recipe.save
            render json: { status: 200 , id: recipe.id }
        else 
            render json: { status: 500, message: "レシピ作成に失敗しました"}
        end
    end

    def index
        recipes = Recipe.where(is_active: true).includes(:ingredients).page(params[:page]).per(10)
        pagination = resources_with_pagination(recipes)
        
        recipes_json = recipes.as_json(
            only: [:id, :title, :preparation_time, :press_time, :image],
            include: {
                ingredients: {
                    only: [:name]
                }
            }
        )

        render json: { status: 200, recipes: recipes_json, pagination: pagination }
    end

    def show
        if @recipe.is_active != true
            render json: { error: 'レシピが見つかりません', status: 404 }
        else
            render json: { 
                status: 200, 
                recipe: @recipe.as_json(include: {
                    ingredients: {},
                    steps: {},
                    user: { only: [:image, :nickname] }
                })
            }
        end
    end

    def edit
        render json: { status: 200, recipe: @recipe, ingredients: @recipe.ingredients, steps: @recipe.steps}
    end

    def update
        if current_api_v1_user != @recipe.user
            render json: { message: "アクセス権限があるユーザではありません" , status: 403}
        else
            if recipe_params[:image].present?
                @recipe.image = recipe_params[:image]
            end

            if @recipe.update(recipe_params.except(:image))
                render json: { status: 200, id: @recipe.id}
            else
                render json: { status: 500, message: "更新に失敗しました"}
            end
        end
    end

    def destroy
        recipe = Recipe.find(params[:id])
        if recipe.delete
            render json: { status: 200, message: "削除しました" }
        else
            render json: { status: 200, message: "削除に失敗しました" }
        end
    end

    private
        def set_recipe
            @recipe = Recipe.find_by(id: params[:id])
            if !@recipe
                render json: { error: 'レシピが見つかりません', status: 404 }
            end
        end

        def recipe_params
            params.permit(:title, :press_time, :preparation_time, :servings, :is_active, :caption, :image)
        end

end
