import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root:{
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height:200,
        width:'100%',
        color:'white',
    },
    
    title:{
        fontSize: 60,
        display:'inline-block',
        position:'absolute',
        top: 40,
        left:'15vw',
    },
    description:{
        fontSize: 25,
        display:'inline-block',
        position:'absolute',
        top:120,
        left:'15vw',
    }
});

const Header = ()=>{
    const classes = useStyles();
    return(
    <div className={classes.root}>
        <h1 className={classes.title}>My Todo App</h1>
        <h2 className={classes.description}>Managing your Task</h2>
    </div>)
        
}
export default Header;
