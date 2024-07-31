json.task do
  json.extract! @task,
    :id,
    :slug,
    :title,
    :description

  json.assigned_user do
    json.extract! @task.assigned_user,
      :id,
      :name
  end
end
