# frozen_string_literal: true

require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @creator = create(:user)
    @assignee = create(:user)
    @task = create(:task, assigned_user: @assignee, task_owner: @creator)
    @creator_headers = headers(@creator)
    @assignee_headers = headers(@assignee)
  end

  def test_should_list_all_tasks_for_valid_user
    get tasks_path, headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    all_tasks = response_json["tasks"]

    expected_tasks_ids = Task.pluck(:id).sort
    actual_tasks_ids = all_tasks.pluck("id").sort

    assert_equal expected_tasks_ids, actual_tasks_ids
  end

  def test_should_create_valid_task
    post tasks_path,
      params: { task: { title: "Learn Ruby", task_owner_id: @creator.id, assigned_user_id: @assignee.id } },
      headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("resource.created", resource_name: "Task"), response_json["notice"]
  end

  def test_shouldnt_create_task_without_title
    post tasks_path, params: { task: { title: "", task_owner_id: @creator.id, assigned_user_id: @assignee.id } },
      headers: @creator_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Title can't be blank, Title is invalid", response_json["error"]
  end

  def test_creator_can_update_any_task_fields
    new_title = "#{@task.title}-(updated)"
    task_params = { task: { title: new_title, assigned_user_id: @assignee.id } }

    put task_path(@task.slug), params: task_params, headers: @creator_headers
    assert_response :success
    @task.reload
    assert_equal new_title, @task.title
    assert_equal @assignee.id, @task.assigned_user_id
  end

  def test_assignee_shouldnt_destroy_task
    delete task_path(@task.slug), headers: @assignee_headers
    assert_response :forbidden
    response_json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), response_json["error"]
  end

  def test_assignee_shouldnt_update_restricted_task_fields
    new_title = "#{@task.title}-(updated)"
    task_params = { task: { title: new_title, assigned_user_id: @assignee.id } }

    assert_no_changes -> { @task.reload.title } do
      put task_path(@task.slug), params: task_params, headers: @assignee_headers
      assert_response :forbidden
    end
  end

  def test_assignee_can_change_status_of_task
    task_params = { task: { status: "done" } }

    put task_path(@task.slug), params: task_params, headers: @assignee_headers
    assert_response :success
    @task.reload
    assert @task.done?
  end

  def test_creator_can_change_status_of_task
    task_params = { task: { status: "done" } }

    put task_path(@task.slug), params: task_params, headers: @creator_headers
    assert_response :success
    @task.reload
    assert @task.done?
  end

  def test_assignee_can_change_due_date_of_task
    updated_time = "2022-11-24 00:00:00 UTC"
    task_params = { task: { due_date: updated_time } }

    put task_path(@task.slug), params: task_params, headers: @assignee_headers
    assert_response :success
    @task.reload
    assert_equal updated_time, @task.due_date.to_s
  end

  def test_creator_can_change_due_date_of_task
    updated_time = "2022-11-24 00:00:00 UTC"
    task_params = { task: { due_date: updated_time } }

    put task_path(@task.slug), params: task_params, headers: @creator_headers
    assert_response :success
    @task.reload
    assert_equal updated_time, @task.due_date.to_s
  end

  def test_not_found_error_rendered_for_invalid_task_slug
    invalid_slug = "invalid-slug"

    get task_path(invalid_slug), headers: @creator_headers
    assert_response :not_found
    assert_equal I18n.t("task.not_found"), response.parsed_body["error"]
  end
end
