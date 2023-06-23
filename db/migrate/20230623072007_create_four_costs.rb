class CreateFourCosts < ActiveRecord::Migration[7.0]
  def change
    create_table :four_costs do |t|

      t.timestamps
    end
  end
end
