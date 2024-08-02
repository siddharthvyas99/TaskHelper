json.extract! task,
    :id,
    :slug,
    :title,
    :status,
    :description,
    :due_date

json.assigned_user do
  json.extract! task.assigned_user,
    :id,
    :name,
    :avatar_url
end

json.task_owner do
  json.extract! task.task_owner,
    :name,
    :avatar_url
end
