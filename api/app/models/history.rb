class History < ApplicationRecord
    belongs_to :wallet

    enum transaction_type: { INCOME: "INCOME", OUTCOME: "OUTCOME" }
end