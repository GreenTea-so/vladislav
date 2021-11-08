import Web3 from "web3"
import abiArray from "./abi"

const web3 = new Web3("http://127.0.0.1:8545")
const Contract = new web3.eth.Contract(abiArray, "0xE8cCDd99e2C4E6C6501f9eA001502783799Af0FA");

const miner = '0x22E32984F35A8Cc9e4B79453870070298EAEeD87';
const minerPassword = '123';


export const registration = async (login, FIO, password)=>{
    try{
        const newAccount = await web3.eth.personal.newAccount(password);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 9999);
        await web3.eth.sendTransaction({from: miner, to: newAccount, value: 200000000000000000000});
        await web3.eth.personal.unlockAccount(newAccount, password, 9999);
        await Contract.methods.createUser(login, FIO).send({from: newAccount});
    }
    catch(e){
        alert(e)
    }
}

export const authorization = async (login, password)=>{
    const address = await Contract.methods.getAddress(login).call();
    await web3.eth.personal.unlockAccount(address, password, 9999);
    web3.eth.defaultAccount = address;
    return address;
}

export const getUser = async (address) => {
    try{
        const user = await Contract.methods.getUser().call({from: address});
        const { login, name, role, license, trip, trips } = user;
        const balance = await web3.eth.getBalance(address);
        const newUser = {
            login,
            name,
            role,
            license,
            balance,
            address,
            trip,
            trips,
        }

        return newUser;
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