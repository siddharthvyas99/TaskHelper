# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  before_action :load_user, only: [:show, :update]

  def index
    users = User.select(:id, :name)
    render status: :ok, json: { users: }
  end

  def create
    user = User.new(user_params)
    user.save!
    render_notice(t("resource.created", resource_name: "User"))
  end

  def show
    @avatar_url = @user.avatar.url if @user.avatar.attached?
    render json: @user.as_json.merge(
      avatar_url: @avatar_url
    )
  end

  def update
    if @user.update(user_params)
      render json: @user.as_json.merge(
        avatar_url: @user.avatar.url
      )
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def load_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
    end
end
