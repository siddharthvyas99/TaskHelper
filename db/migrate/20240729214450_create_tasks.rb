class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks, id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
      t.text :title
      t.text :description
      t.string :status, default: "todo", null: false

      t.timestamps
    end
  end
end
