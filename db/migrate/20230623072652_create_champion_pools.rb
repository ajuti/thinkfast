class CreateChampionPools < ActiveRecord::Migration[7.0]
  def change
    create_table :champion_pools do |t|

      t.timestamps
    end
  end
end
