class Api::V1::SearchesController < ApplicationController
    include Pagination
    def search
        keyword = params[:keyword]

        recipes = Recipe.get_active_recipes.where("title LIKE?", "%#{keyword}%").includes(:ingredients).page(params[:page]).per(10)
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
end
