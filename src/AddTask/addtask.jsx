import { NavLink } from "react-router-dom";
import styles from "./addtask.module.css"
import { useState } from "react";
import { useSelector } from "react-redux";
import { mainSelector } from "../Redux/reducers/mainReducers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function AddTask(){
    const {user, tasks} = useSelector(mainSelector);
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ date, setDate ] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user){
            return new Error("Login first")
        }

        const currTask = {
            id:tasks.length,
            title,
            desc,
            date,
            status:"pending",
            userId:user.id
        }
        const task =  localStorage.getItem("task");
        let tasksArray = [];

        if(!task){
           tasksArray.push(currTask)
           localStorage.setItem("task", JSON.stringify(tasksArray))
        }
        else{
            tasksArray = JSON.parse(task);
            tasksArray.push(currTask)
            localStorage.setItem("task",JSON.stringify(tasksArray))
        }
        toast.success("task created")
        setTitle("");
        setDesc("");
        setDate("");
        navigate('/')
    }
    return(
        <div>
            <NavLink to="/">
            <img className={styles.backImg} src="https://cdn-icons-png.flaticon.com/128/7915/7915208.png" alt="not found"/>
            </NavLink>
            <div className={styles.addForm}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Description</label>
                        <input value={desc} type="text" onChange={(e) => setDesc(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Due date</label>
                        <input value={date} type="datetime-local" onChange={(e) => setDate(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                    </div>
  
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        
    )
}

export default AddTask;