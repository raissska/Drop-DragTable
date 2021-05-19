import React, {useContext, useState} from "react";
import {Context} from "../App";

export default function TableBody() {

    const {fileList,setFileList} = useContext(Context);
    const [currentList, setCurrentList] = useState(null);
    function dragStartHandler(e, list) {
        setCurrentList(list);

    }

    function dragLeaveHandler(e) {
        e.target.parentElement.style.border = 'none'

    }

    function dragEndHandler(e) {
        if (currentList) {
            const curArr = [...fileList]
            const num = curArr.indexOf(currentList);
            console.log(num);
            curArr.splice(num, 1)
            setFileList(curArr);
            setCurrentList(null);
        }
        e.target.parentElement.style.border = '0px';
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.parentElement.style.border = '2px solid #039';
    }

    function dropHandler(e, file) {
        e.preventDefault();
        setFileList(fileList.map(f => {
            if (f.order === file.order) {
                return {...f, order: currentList.order}
            }
            if (f.order === currentList.order) {
                return {...f, order: file.order}
            }
            return f
        }))
        e.target.parentElement.style.border = '0px';
        setCurrentList(null)
    }

    const sortList = (a, b) => {
        if (a.order > b.order) {
            return 0
        } else return -2
    }

    return (
        <tbody>
        {fileList.sort(sortList).map((f, index) => {
                f.order = (index+1);
                return (<tr key={f.docId}
                            onDragStart={(e) => dragStartHandler(e, f)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e, f)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropHandler(e, f)}
                            draggable={true}
                            className={'table-list'}>
                    <td>{f.order}</td>
                    <td>{f.docType}</td>
                    <td>{f.companyId}</td>
                    <td>{f.date}</td>
                    <td>{f.docId}</td>
                    <td>{f.sign}</td>
                    <td>{f.amount}</td>
                </tr>)
            }
        )}
        </tbody>
    )
}