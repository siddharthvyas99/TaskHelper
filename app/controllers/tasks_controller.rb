# frozen_string_literal: true

class TasksController < ApplicationController
  # To-Do : Use Pundit for better authorization
  before_action :load_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all.as_json(include: { assigned_user: { only: %i[name id] } })
    render status: :ok, json: { tasks: @tasks }
    # Implement searching and pagination using Pagy gem
  end

  def create
    task = current_user.created_tasks.new(task_params)
    task.save!

    if task.save
      render_notice(t("resource.created", resource_name: "Task"))
    end
  end

  def show
    render
  end

  def update
    if @task.update_attributes(task_params)
      render_notice(t("resource.updated", resource_name: "Task"))
    end
  end

  def destroy
    @task.destroy
    render_notice(t("resource.deleted", resource_name: "Task"))
  end

  private

    def load_task
      @task = Task.find_by!(slug: params[:slug])
    end

    def task_params
      params[:task].permit(:title, :description, :status, :assigned_user_id)
    end
end
