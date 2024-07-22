class Api::V1::HistoriesController < ApplicationController

    def index
        wallet_id = params[:wallet_id]
        wallet = Wallet.find(wallet_id)

        if wallet.nil? then
            return render json: { status: 404, histories: nil }
        end

        render json: {
            status: 200,
            histories: wallet.histories
        }
    end

    def show
        # 将来的にはユーザやwalletの認証を行う
        history = History.find(params[:id])

        if history.nil? then
            return render json: { status: 404, history: nil }
        end

        render json: {
            status: 200,
            history: history
        }
    end

    def create
        wallet = Wallet.find(params[:wallet_id])
        if wallet.nil? then
            return render json: { status: 404, history: nil }
        end

        history = History.new(
            wallet_id: params[:wallet_id],
            name: params[:name],
            amount: params[:amount],
            transaction_type: params[:type],
        )

        if history.save then
            render json: {
                status: 201,
                history: history
            }
        else
            render json: {
                status: 422,
                history: history
            }
        end
    end

    def update
        wallet = Wallet.find(params[:wallet_id])
        if wallet.nil? then
            return render json: { status: 404, history: nil }
        end

        history = History.find(params[:id])

        if history.nil? then
            return render json: { status: 404, history: nil }
        end

        history.update(
            wallet_id: params[:wallet_id],
            name: params[:name],
            amount: params[:amount],
            transaction_type: params[:type],
            updated_at: Time.now
        )

        render json: {
            status: 200,
            history: history
        }
    end

    def move
        destination_wallet = Wallet.find(params[:destination_id])
        if destination_wallet.nil? then
            return render json: { status: 404, history: nil }
        end

        history = History.find(params[:id])

        if history.nil? then
            return render json: { status: 404, history: nil }
        end

        # 将来的にHistoryエンティティを作成して、イミュータブルにする
        history.update(
            wallet_id: params[:destination_id],
            updated_at: Time.now
        )

        render json: {
            status: 200,
            history: history
        }
    end

    def destroy
        wallet = Wallet.find(params[:wallet_id])
        if wallet.nil? then
            return render json: { status: 404, history: nil }
        end

        history = History.find(params[:id])

        if history.nil? then
            return render json: { status: 404, history: nil }
        end

        history.destroy

        render json: {
            status: 200,
            history: history
        }
    end
end