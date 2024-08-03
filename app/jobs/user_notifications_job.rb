# frozen_string_literal: true

class UserNotificationsJob
  include Sidekiq::Job

  def perform(user_id)
    DueTasksMailer.due_tasks_email(user_id).deliver_later
  end
end
