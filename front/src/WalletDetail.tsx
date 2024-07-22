import { useState, useEffect } from "react";
import { Wallet } from "./libs/type/Wallet";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { GetWalletResponse } from "./libs/type/GetWalletResponse";
import './css/WalletDetail.css';
import { IconButton } from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { History } from "./libs/type/History";

const WalletDetail = () => {

    const [wallet, setWallet] = useState<Wallet>();
    const [isOpenWalletModal, setIsOpenWalletModal] = useState(false);
    const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
    const [walletName, setWalletName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [transactionType, setTransactionType] = useState<string>("INCOME");
    const [editHistoryId, setEditHistoryId] = useState<number>(0);

    let { id } = useParams();

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
        getWallet();
    }, []);

    async function getWallet() {
        let response = await axios.get<GetWalletResponse>(`http://localhost:8080/api/v1/wallets/${id}?include_histories=true`);
        console.log(response.data)
        setWallet(response.data.wallet);
        setWalletName(response.data.wallet.name);
    }

    async function updateWallet() {
        let response = await axios.put(`http://localhost:8080/api/v1/wallets/${id}`, {
            name: walletName
        });

        console.log(response.data);
        getWallet();
        setIsOpenWalletModal(false)
    }

    async function delteWallet() {
        // confirm
        if (!window.confirm("Are you sure?")) {
            return;
        }
        let response = await axios.delete(`http://localhost:8080/api/v1/wallets/${id}`);
        console.log(response.data);
        window.location.href = "/";
    }

    const handleOpen = () => {
        setName("");
        setAmount(0);
        setTransactionType("INCOME");
        setEditHistoryId(0);
        setIsOpenHistoryModal(true);
    };

    const handleWalletOpen = () => {
        setWalletName(wallet?.name || "");
        setIsOpenWalletModal(true);
    }

    const handleWalletClose = () => setIsOpenWalletModal(false);
    const handleClose = () => setIsOpenHistoryModal(false);

    function handleOpenForEdit(history: History) {
        setName(history.name);
        setAmount(history.amount);
        setTransactionType(history.transaction_type);
        setEditHistoryId(history.id);
        setIsOpenHistoryModal(true);
    }

    async function deleteHistory(history_id: number) {
        // confirm
        if (!window.confirm("Are you sure?")) {
            return;
        }
        let response = await axios.delete(`http://localhost:8080/api/v1/wallets/${id}/histories/${history_id}`);
        console.log(response.data);
        getWallet();
    }

    async function AddHistory() {
        let response = await axios.post(`http://localhost:8080/api/v1/wallets/${id}/histories`, {
            name: name,
            amount: amount,
            type: transactionType
        });

        console.log(response.data);
        getWallet();
        setIsOpenHistoryModal(false)
    }

    async function UpdateHistory() {
        let response = await axios.put(`http://localhost:8080/api/v1/wallets/${id}/histories/${editHistoryId}`, {
            name: name,
            amount: amount,
            type: transactionType
        });

        console.log(response.data);
        getWallet();
        setIsOpenHistoryModal(false)
    }

    return (
        <div className="main">
            <div className="spacer" style={{ height: "5vh" }}></div>
            <div className="wallet-name">
                <span style={{ width: "33%" }} ></span>
                <h1 style={{ width: "33%", textAlign: "center" }}>
                    <IconButton onClick={handleWalletOpen} >
                        <Edit />
                    </IconButton>
                    { wallet?.name }
                </h1>
                <div className="action-menu" style={{ width: "33%" }}>
                    <IconButton onClick={handleOpen}>
                        <AddCircle />
                    </IconButton>
                    <IconButton onClick={delteWallet}>
                        <Delete />
                    </IconButton>
                </div>
            </div>
            <h1 className="wallet-balance">￥{ wallet?.balance }</h1>
            <div className="wallet-details">
                <div className="histories">
                    {wallet?.histories.map((history) => (
                        <div className="history" key={history.id}>
                            <div className={ history.transaction_type == "INCOME" ? "blue" : "red"}>　</div>
                            <div className="history-body">
                                <div className="history-header">
                                    <small>{history.created_at}</small>
                                    <div>
                                        <IconButton onClick={() => {handleOpenForEdit(history)}} >
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => {deleteHistory(history.id)}} >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="history-content">
                                    <span>{history.name}</span>
                                    <span>
                                        {history.transaction_type == "OUTCOME" ? "-" : ""} 
                                        ￥{history.amount}
                                    </span>
                                </div>
                                <div className="history-result">
                                    <span></span>
                                    <small className="gray">　</small>
                                </div>
                            </div>
                        </div>
                    ))}
                     
                </div>
            </div>

            <Modal
                open={isOpenHistoryModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal">
                        <h1>Add History</h1>
                        <TextField id="filled-basic" label="name" variant="filled" value={name} onChange={(e) => {setName(e.target.value)}} />
                        <TextField id="filled-basic" label="amount" type="number" variant="filled" value={amount} onChange={(e) => {setAmount(Number(e.target.value))}} />

                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">TRANSACTION TYPE</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="INCOME" control={<Radio />} label="INCOME" onClick={() => {setTransactionType("INCOME")}} checked={ transactionType == "INCOME" } />
                                <FormControlLabel value="OUTCOME" control={<Radio />} label="OUTCOME" onClick={() => {setTransactionType("OUTCOME")}} checked={ transactionType == "OUTCOME" } />
                            </RadioGroup>
                        </FormControl>

                        <Button variant="contained" onClick={ editHistoryId == 0 ? AddHistory : UpdateHistory}>Add</Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isOpenWalletModal}
                onClose={handleWalletClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal">
                        <h1>Edit Wallet Name</h1>
                        <TextField id="filled-basic" label="name" variant="filled" value={walletName} onChange={(e) => {setWalletName(e.target.value)}} />

                        <Button variant="contained" onClick={ updateWallet }>Update</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default WalletDetail;