# frozen_string_literal: true

class DueTasksNotificationsJob
  include Sidekiq::Job

  def perform
    due_tasks_notification_service = DueTasksNotificationService.new
    due_tasks_notification_service.process
  end
end
