import { useDispatch, useSelector } from "react-redux";
import { actions, mainSelector } from "../Redux/reducers/mainReducers";
import styles from "./home.module.css";
import { useEffect } from "react";
import toast from "react-hot-toast";

function HomePage() {
    const { user, tasks } = useSelector(mainSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const taskString = localStorage.getItem("task");
        let taskArray = []
        dispatch(actions.setTasks(taskArray))
        if (taskString) {
            taskArray = JSON.parse(taskString);
            dispatch(actions.setTasks(taskArray)); 
        } 
    }, [dispatch]);

    const removeTask =(id) =>{
        const taskString = localStorage.getItem("task");
        let taskArray = []
        dispatch(actions.setTasks(taskArray))
        if (taskString) {
            taskArray = JSON.parse(taskString);
            let filtered = taskArray.filter(ele => ele.id !== id)
            localStorage.setItem("task", JSON.stringify(filtered))
            dispatch(actions.setTasks(filtered)); 
        } 
        toast.success("task deleted")

    }


    const updateStatus =async (id) =>{
        dispatch(actions.updateTask({ id }));
        const updatedTasks = await tasks.map(ele => {
            if (ele.id === id) {
                return {
                    ...ele,
                    status: ele.status === "pending" ? "In Progress" : 
                            ele.status === "In Progress" ? "completed" : 
                            "pending"
                };
            }else{
                return ele;
            }
        });
        dispatch(actions.setTasks([]))

        localStorage.setItem("task", JSON.stringify(updatedTasks));
        dispatch(actions.setTasks(updatedTasks));

    }

    const filteredTask = tasks.filter(ele => ele.userId === user.id);


    return (
        <div>
            <span className={styles.welcomeLine}>Welcome to your dashboard, {user.name}!</span>
            <div className={styles.tasksDiv}>
                {filteredTask.map((ele, key) => (
                    <div className={styles.card} key={ele.id}>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginRight: "10px" }}>{key + 1}.</h4>
                            <h4>{ele.title}</h4>
                        </div>
                        {ele.status === "pending"?
                          <h6 style={{color:"red"}} onClick={() =>updateStatus(ele.id)}>Status - {ele.status}</h6>
                          :
                          ele.status === "In Progress"?
                          <h6 onClick={() =>updateStatus(ele.id)}>Status - {ele.status}</h6>:

                          <h6 style={{color:"green"}} onClick={() =>updateStatus(ele.id)}>Status - {ele.status}</h6>



                        }
                        <h6>Due Date - {ele.date}</h6>
                        <img
                            className={styles.deleteBtn}
                            onClick={() =>removeTask(ele.id)}
                            src="https://cdn-icons-png.flaticon.com/128/5974/5974771.png"
                            alt="not found"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
