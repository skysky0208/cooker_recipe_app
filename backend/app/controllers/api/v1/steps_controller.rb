class Api::V1::StepsController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:update]
    before_action :set_recipe

    def show
        render json: {status: 200, steps: @recipe.steps}
    end

    def update
        if current_api_v1_user != @recipe.user
            render json: { message: "アクセス権限があるユーザではありません" , status: 403}
        else
            new_steps = params[:steps]

        new_steps.each do |item|
            step = @recipe.steps.find_or_initialize_by(order: item['order'])
            step.description = item['description']
            if not step.save
                render json: { message: "保存できませんでした" , status: 500}
            end
        end
        
        max_order = new_steps[new_steps.length-1]['order']
        print(max_order)

        deleted_recipe = @recipe.steps.where("`order` > ?", max_order)
        if deleted_recipe
            deleted_recipe.destroy_all
        end
        
        render json: {status: 200, steps: @recipe.steps}
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
            params.permit(:steps)
        end
    
end
