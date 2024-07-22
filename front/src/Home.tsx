import { useState, useEffect } from "react";
import axios from 'axios';
import WalletCard from "./components/wallet";
import { GetWalletsResponse } from "./libs/type/GetWalletsResponse";
import { Wallet } from "./libs/type/Wallet";
import './css/Home.css';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    useEffect(() => {
        getWallets();
    }, []);

    async function getWallets() {
        let response = await axios.get<GetWalletsResponse>("http://localhost:8080/api/v1/wallets");
        console.log(response.data)

        setWallets(response.data.wallets);
    }

    async function createWallet() {
        let response = await axios.post("http://localhost:8080/api/v1/wallets", {
            name: name
        });
        console.log(response.data)
        setWallets([...wallets, response.data.wallet]);
        setIsOpen(false);
        getWallets();
    }

    const handleOpen = () => {
        setName("");
        setIsOpen(true);
    };
    const handleClose = () => setIsOpen(false);

    return (
        <div className="main">
            <div className="spacer" style={{ height: "5vh" }}></div>
            <div className="wallets-title">
                <span style={{ width: "33%" }} ></span>
                <h1 style={{ width: "33%", textAlign: "center" }}>Wallets</h1>
                <div className="action-menu" style={{ width: "33%" }}>
                    <IconButton onClick={handleOpen}>
                        <AddCircle />
                    </IconButton>
                </div>
            </div>
            <div className="wallets">
                {wallets.map((wallet: any) => (
                <WalletCard wallet={wallet} key={wallet.id} />
                ))}
            </div>

            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal">
                        <h1>Edit Wallet Name</h1>
                        <TextField id="filled-basic" label="name" variant="filled" value={name} onChange={(e) => {setName(e.target.value)}} />

                        <Button variant="contained" onClick={ createWallet }>Create</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Home;