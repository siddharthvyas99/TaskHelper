# frozen_string_literal: true

class DueTasksNotificationService
  attr_reader :users_to_notify

  def initialize
    @users_to_notify = get_users_to_notify
  end

  def process
    notify_users
  end

  private

    def get_users_to_notify
      get_users_with_pending_tasks
    end

    def notify_users
      users_to_notify.find_each do |user|
        UserNotificationsJob.perform_async(user.id)
      end
    end

    def get_users_with_pending_tasks
      User.includes(:assigned_tasks).where.not(tasks: { status: "done" })
        .where("tasks.due_date <= ?", Time.zone.today)
    end
end
