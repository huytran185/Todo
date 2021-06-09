import React, {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField, Button} from '@material-ui/core/';
import {useDispatch, useSelector} from 'react-redux';
import { fetchTask,postNewTask, deleteTask,editTask} from './taskSlice'
// import { getTask } from '../../api/api';
const useStyles = makeStyles({
    form:{
        width:'50%',
        margin: '50px auto 30px auto',
    },
    FormContainer:{
        width:'100%',
    },
    FormTitle:{
        margin: '50px 0 0 0 ',
        fontSize:30,
        textAlign:'center',
    },
    table:{
        width:'50%',
        margin: '20px auto 50px auto',
        '& tr':{
            '&:nth-child(even)':{
                backgroundColor: '#dddddd',
            }
        },
        '& td':{
            fontSize:30,
            padding: 20,
            '&:first-child':{
                width:'70%',
                fontSize:25,
                paddingLeft: 70,
                textTransform: 'capitalize',
            },
            '&:nth-child(2)':{
                width:'15%',
                cursor:'pointer',
            },
            '&:nth-child(3)':{
                width:'15%',
                cursor:'pointer',
            }
        }
    },
    
})
const StyledButton = withStyles({
    root:{
        width:'50%',
        margin: '0px auto 30px auto',
        display:'block',
        fontSize:18,
    }
})(Button);

const Tasks = ()=>{
    const dispatch = useDispatch();
    // const [tasks, setTasks]= useState(['test1', 'test2', 'test3','test4','test5']);
    const tasks = useSelector(state=>state.tasks.list)
    const loading = useSelector(state=>state.tasks.loading)
    const [newTask, setNewTask] = useState('');
    const [editName, setEditName] = useState('');
    const [editId, setEditId] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const classes = useStyles();
    useEffect(()=>{
        dispatch(fetchTask())
    },[dispatch])
    const addNewTask = (e)=>{
        e.preventDefault();
        dispatch(postNewTask(newTask));
        setNewTask('');
    }
    const changeInput = (e)=>{
        if(showEdit){
            setEditName(e.target.value);
        }else{
            setNewTask(e.target.value);
        }
    }
    const updateTask = (e)=>{
        e.preventDefault();
        dispatch(editTask([editId, editName]))
    }
    const removeTask = (i)=>{
        dispatch(deleteTask(i));
    }
    let taskDisplay = [];
    if(loading !== 'loading'){
        for(let key in tasks){
            taskDisplay.push(
            <tr key={key}>
                <td>{tasks[key]['name']}</td>
                <td><EditIcon 
                onClick={()=>{setShowEdit(true); setEditId(key); setEditName(tasks[key]['name'])}}
                style={{color:'grey'}}/></td>
                <td><DeleteIcon 
                onClick = {()=>removeTask(key)}
                style={{color:'salmon'}}/></td>
            </tr>)
        }
    }
    return(
        <div>
            {!showEdit && 
                (<div className={classes.FormContainer}>
                    <div className={classes.FormTitle}>Add New Task</div>
                    <form onSubmit={(e)=>addNewTask(e)} className={classes.form} autoComplete="off">
                        <TextField
                            id="task" 
                            variant="outlined"
                            fullWidth
                            value={newTask}
                            label ="Enter Your New Task..."
                            onChange={(e)=>changeInput(e)}/>
                        </form>
                </div>)
            }

            {showEdit && 
                (<div className={classes.FormContainer}>
                    <div className={classes.FormTitle}>Edit Task Name</div>
                    <form onSubmit={(e)=>updateTask(e)} className={classes.form} autoComplete="off">
                        <TextField
                        id="task" 
                        variant="outlined"
                        fullWidth
                        label ="Enter New Task Name ..."
                        value={editName}
                        onChange={(e)=>changeInput(e)}/>
                    </form>
                    <StyledButton variant="contained" color="secondary" onClick={()=>setShowEdit(false)}>
                        Cancel Edit Task Name
                    </StyledButton>
                </div>)
            }
            <hr style={{width:'70%'}}/>
            <table className={classes.table}>
                <tbody>
                    {taskDisplay}
                </tbody>
            </table>
        </div>
    )
}

export default Tasks;