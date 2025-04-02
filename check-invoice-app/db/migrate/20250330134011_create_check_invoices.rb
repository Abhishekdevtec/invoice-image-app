class CreateCheckInvoices < ActiveRecord::Migration[8.0]
  def change
    create_table :check_invoices do |t|
      t.references :check, foreign_key: true
      t.references :invoice, foreign_key: true

      t.timestamps
    end
  end
end
