class Api::V1::WalletsController < ApplicationController
    def index
        wallets = Wallet.all

        # walletにbalanceを追加
        render json: { 
            status: 200, 
            wallets: wallets.map { 
                |wallet| JSON.parse(wallet.to_json).merge({ balance: wallet.balance })
            }
        }
    end

    def show
        include_histories = params[:include_histories] == "true"
        wallet = Wallet.find(params[:id])

        # If wallet is nil, return a 404 status code
        if wallet.nil? then
            return render json: { status: 404, wallet: nil }
        end

        if include_histories then
            return render json: {
                status: 200,
                wallet: JSON.parse(wallet.to_json).merge({
                    balance: wallet.balance,
                    histories: wallet.histories
                })
            }
        end

        render json: {
            status: 200,
            wallet: wallet
        }
    end

    def create
        wallet = Wallet.new(
            name: params[:name]
        )

        if wallet.save then
            render json: {
                status: 201,
                wallet: wallet
            }
        else
            render json: {
                status: 422,
                wallet: wallet
            }
        end
    end

    def update
        wallet = Wallet.find(params[:id])

        if wallet.nil? then
            return render json: { status: 404, wallet: nil }
        end

        wallet.update(
            name: params[:name]
        )

        render json: {
            status: 200,
            wallet: wallet
        }
    end

    def destroy
        wallet = Wallet.find(params[:id])

        if wallet.nil? then
            return render json: { status: 404, wallet: nil }
        end

        wallet.destroy

        render json: {
            status: 204,
            wallet: nil
        }
    end
end