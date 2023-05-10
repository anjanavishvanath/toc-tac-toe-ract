
export default function Square(props){

    return (
        <div className="square" onClick={props.clickFunction} >{props.value}</div>
    )
}