class Api::V1::UsersController < ApplicationController
    before_action :authenticate_api_v1_user!, only: [:mypage]

    def mypage
        user = current_api_v1_user
        active_recipes = user.recipes.where(is_active: true)
        inactive_recipes = user.recipes.where(is_active: false)

        render json: { status: 200, user: user, active_recipes: active_recipes, inactive_recipes: inactive_recipes }
    end
end
