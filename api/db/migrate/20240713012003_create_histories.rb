class CreateHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :histories do |t|
      t.string :name
      t.decimal :amount
      t.string :transaction_type
      t.references :wallet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
