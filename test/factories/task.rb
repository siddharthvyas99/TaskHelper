# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    association :assigned_user, factory: :user
    association :task_owner, factory: :user
    title { Faker::Lorem.sentence[0..49] }
    due_date { Faker::Date.forward(days: 30) }
    description { Faker::Lorem.paragraph(sentence_count: 10) }
    status { "todo" }
  end
end
