# frozen_string_literal: true

class TasksController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :load_task, only: [:show, :update, :destroy]
  before_action :ensure_authorized_update_to_restricted_attrs, only: :update

  def index
    @tasks = policy_scope(Task)
    render
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
      params[:task].permit(:title, :description, :status, :assigned_user_id, :due_date)
    end

    def ensure_authorized_update_to_restricted_attrs
      is_editing_restricted_params = Task::RESTRICTED_ATTRIBUTES.any? { |a| task_params.key?(a) }
      is_not_owner = @task.task_owner_id != @current_user.id
      if is_editing_restricted_params && is_not_owner
        handle_authorization_error
      end
    end
end
