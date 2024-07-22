import { Wallet } from '../libs/type/Wallet';
import '../css/WalletCard.css'
import { Link } from 'react-router-dom';

export type WalletProps = {
    wallet: Wallet,
}

const WalletCard = ({ wallet }: WalletProps) => {
    // Walletのアイコン・名前・残高を表示する
    return (
        <div className='wallet-card'>
            <div className='title'>
                <img className='wallet-icon' src="/wallet.svg" alt="" />
                <Link to={`/wallet/${wallet.id}`}>{ wallet.name }</Link>
            </div>
            <p>￥{ wallet.balance }</p>
        </div>
    );
}

export default WalletCard;