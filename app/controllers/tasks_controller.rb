# frozen_string_literal: true

class TasksController < ApplicationController
  # To-Do : Use Pundit for better authorization
  before_action :load_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all
    render status: :ok, json: { tasks: @tasks }
    # Implement searching and pagination using Pagy gem
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = current_user.id

    if @task.save
      render notice: t("resource.created", { resource_name: "Task" })
    end
  end

  def show
    render
  end

  def update
    if @task.update_attributes(task_params)
      render notice: t("resource.updated", { resource_name: "Task" })
    end
  end

  def destroy
    @task.destroy
    render notice: t("resource.deleted", { resource_name: "Task" })
  end

  private

    def load_task
      @_load_task ||= Task.find_by!(slug: params[:slug])
    end

    def task_params
      params[:task].permit(:title, :description, :status)
    end
end
