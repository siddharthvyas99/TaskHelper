# frozen_string_literal: true

class TasksController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :load_task, only: [:show, :update, :destroy]

  def index
    tasks = policy_scope(Task)
    tasks_with_assigned_user = tasks.as_json(include: { assigned_user: { only: %i[name id] } })
    render_json({ tasks: tasks_with_assigned_user })
    # Implement searching and pagination using Pagy gem
  end

  def create
    task = current_user.created_tasks.new(task_params)
    authorize task
    task.save!
    render_notice(t("resource.created", resource_name: "Task"))
  end

  def show
    authorize @task
    render
  end

  def update
    authorize @task
    @task.update!(task_params)
    render_notice(t("resource.updated", resource_name: "Task"))
  end

  def destroy
    authorize @task
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
