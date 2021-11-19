import Web3 from "web3"
import abiArray from "./abi"

const web3 = new Web3("http://127.0.0.1:8545")
const Contract = new web3.eth.Contract(abiArray, "0xa554F85f5510DaeF4517138358a7E117CB6a87D4");

const miner = '0x22E32984F35A8Cc9e4B79453870070298EAEeD87';
const minerPassword = '123';


export const registration = async (email, FIO, password)=>{
    try{
        const newAccount = await web3.eth.personal.newAccount(password);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 9999);
        await web3.eth.sendTransaction({from: miner, to: newAccount, value: 200000000000000000000});
        await web3.eth.personal.unlockAccount(newAccount, password, 9999);
        await Contract.methods.Registration(email, FIO).send({from: newAccount});
    }
    catch(e){
        alert(e)
    }
}

export const authorization = async (address, password)=>{
    try {
        await web3.eth.personal.unlockAccount(address, password, 9999);
        web3.eth.defaultAccount = address;
        return address;
    }
    catch(e) {
        alert(e);
    }
}

export const getUser = async (address) => {
    try{
        const user = await Contract.methods.getUser().call({from: address});
        return user;
    }
    catch(e){
        alert(e)
    }
}

export const getCars = async () => {
    try{
        const cars = await Contract.methods.getCars().call();
        return cars;
    }
    catch(e){
        alert(e)
    }
}

export const rentCar = async (address, idCar) => {
    try{
        await Contract.methods.rentCar(idCar).send({from: address, value: 100000000000000000000});
    }
    catch(e){
        alert(e)
    }
}

export const endRent = async (address, idCar) => {
    try{
        await Contract.methods.endRent(idCar).send({from: address});
    }
    catch(e){
        alert(e)
    }
}

export const driveAdd = async (address, driveNumber, category, srok) => {
    try{
        await Contract.methods.drive_add(driveNumber, srok, category).send({from: address});
    }
    catch(e){
        alert(e)
    }
}

export const createCar = async (address, model, mileage) => {
    try{
        await Contract.methods.createCar(model, mileage).send({from: address});
        alert('Автомобиль создан');
    }
    catch(e){
        alert(e)
    }
}

export const getTrips = async (address) => {
    try{
        const cars = await Contract.methods.getTrips().call({from: address});
        return cars;
    }
    catch(e){
        alert(e)
    }
}

export const newVoting = async (address, question, open_voting, time) => {
    try{
        await Contract.methods.New_voting(question, open_voting, time).send({from: address});
    }
    catch(e){
        alert(e)
    }
}