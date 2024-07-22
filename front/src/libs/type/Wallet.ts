import { History } from "./History";

export interface Wallet {
    id: number;
    name: string;
    balance: number;
    histories: History[];
}