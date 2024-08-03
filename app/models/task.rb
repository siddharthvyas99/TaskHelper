# frozen_string_literal: true

class Task < ApplicationRecord
  scope :overdue, -> {
    where.not(status: "done").where("due_date <= ?", Time.zone.today)
  }

  MAX_TITLE_LENGTH = 125
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  RESTRICTED_ATTRIBUTES = %i[title task_owner_id assigned_user_id]

  enum :status, { to_do: "todo", in_progress: "in_progress", done: "done" }, default: :to_do

  belongs_to :assigned_user, foreign_key: "assigned_user_id", class_name: "User"
  belongs_to :task_owner, foreign_key: "task_owner_id", class_name: "User"

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug
  before_destroy :assign_tasks_to_task_owners

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug ~* ?"
      latest_task_slug = Task.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, "is immutable!")
      end
    end

    def assign_tasks_to_task_owners
      tasks_whose_owner_is_not_current_user = assigned_tasks.where.not(task_owner_id: id)
      tasks_whose_owner_is_not_current_user.find_each do |task|
        task.update(assigned_user_id: task.task_owner_id)
      end
    end
end
