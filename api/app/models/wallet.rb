class Wallet < ApplicationRecord
    has_many :histories, -> { order(created_at: :desc) }, dependent: :destroy

    def balance
        income = self.histories.where(transaction_type: 'INCOME').sum(:amount)
        outcome = self.histories.where(transaction_type: 'OUTCOME').sum(:amount)
        return income - outcome
    end
end