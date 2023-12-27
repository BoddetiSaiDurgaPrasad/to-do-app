import React, { useEffect, useState } from 'react';
import '../App.css';
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
function Todolist() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedToDos,setCompletedToDos]=useState([]);
    const handleAddToDo = () => {
        let newToDoItem = {
            title: newTitle,
            description: newDescription
        }
        let updatedToDoArr = [...allTodos];
        updatedToDoArr.push(newToDoItem);
        setTodos(updatedToDoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedToDoArr))
    }
    const handleDeleteToDo = (index) => {
        let reducedToDo = [...allTodos];
        reducedToDo.splice(index, 1);
        setTodos(reducedToDo);
        localStorage.setItem('todolist', JSON.stringify(reducedToDo));
    }
    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let compltedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;
        
        let filteredItem ={
            ...allTodos[index],
            compltedOn:compltedOn
        }
        let updatedCompletedArr = [...completedToDos];
        updatedCompletedArr.push(filteredItem);
        setCompletedToDos(updatedCompletedArr);
        handleDeleteToDo(index);
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    }
    const handleDeleteCompletedToDo = (index) =>{
        let reducedToDo = [...completedToDos];
        reducedToDo.splice(index, 1);
        setCompletedToDos(reducedToDo);
        localStorage.setItem('completedTodos', JSON.stringify(reducedToDo));
    }
    useEffect(() => {
        let savedToDo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompltedTodo = JSON.parse(localStorage.getItem('completedTodos'));
        if (savedToDo) {
            setTodos(savedToDo);
        }
        if(savedCompltedTodo){
            setCompletedToDos(savedCompltedTodo);
        }
    }, [])

    return (
        <div className='App'>
            <h1>To Do App</h1>
            <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='What is the Task Title' />
                    </div>
                    <div className='todo-input-item'>
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='What is the Task Description' />
                    </div>
                    <div className='todo-input-item'>
                        <button type='button' onClick={handleAddToDo} className='primarybutton'>Add</button>
                    </div>
                </div>
                <div className='button-area'>
                    <button className={`secondarybutton ${isCompleteScreen === false && `active`}`}
                        onClick={() => setIsCompleteScreen(false)}>
                        ToDo
                    </button>
                    <button className={`secondarybutton ${isCompleteScreen === true && `active`}`}
                        onClick={() => setIsCompleteScreen(true)}>
                        Completed
                    </button>
                </div>
                <div className='todo-list'>
                    {isCompleteScreen===false && allTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <MdDeleteForever onClick={() => handleDeleteToDo(index)} className='icon' />
                                    <FaCheck onClick={()=>handleComplete(index)} className='check-icon' />
                                </div>
                            </div>
                        )
                    })}
                    {isCompleteScreen===true && completedToDos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completede on: {item.compltedOn}</small></p>
                                </div>
                                <div>
                                    <MdDeleteForever onClick={() => handleDeleteCompletedToDo(index)} className='icon' />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Todolist;
