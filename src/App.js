import './App.css';
import React, {useEffect, useState} from "react";
import Table from "./components/Table";
import {baseUrl} from "./utils/Constants";

export const Context = React.createContext(null);

function App() {


    const [amount, setAmount] = useState(0);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch(baseUrl, {
            method: 'get',
            credentials: "omit",
            mode: 'cors',
            headers
        })
            .then(response => response.json())
            .then(json => setFileList(json))
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        const sum = fileList.map(f => f.amount);
        const num = sum.reduce((a, b) => a + b, -1);
        setAmount(num > 0 ? num : 0);
    }, [fileList]);

    return (
        <Context.Provider value={{fileList, setFileList}}>
            <div className="container">
                <h3>Drop and Drag Table Component</h3>
                <div>Amounts: {amount}</div>
                {fileList.length ? <Table/> : <div className="loader"></div>}
            </div>
        </Context.Provider>
    );
}

export default App;
