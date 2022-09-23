import classes from './MainHeader.module.css'
const MainHeader = (props)=>{
    return (
        <div className={classes["main-header"]}>
            {props.children}
        </div>
    ); 
}
export default MainHeader;