class Api::V1::SearchesController < ApplicationController
    include Pagination
    def search
        keyword = params[:keyword]
        option = params[:option]

        if keyword.present?
            if option == "title"
                recipes = Recipe.get_active_recipes.where("title LIKE?", "%#{keyword}%").includes(:ingredients).page(params[:page]).per(10)
            elsif option == "ingredient"
                recipes = Recipe.has_ingredient_name_like(keyword).page(params[:page]).per(10)
            end
        else
            recipes = Recipe.get_active_recipes.page(params[:page]).per(10)
        end
        

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
