json.tasks do
  json.partial! "tasks/task", collection: @tasks, as: :task
end
