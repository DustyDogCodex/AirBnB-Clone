function ActivityCard(props){
    return(
        <div className="activity-card">
            <img src={props.img} alt="" />
            <div className="cardStats">
                <img src="Star 1.png" alt="a star" />
                <span> {props.rating} </span>
                <span> ({props.reviews})  &#x2022; </span>
                <span> {props.location}</span>
            </div>
            <p>{props.title}</p>
            <p><span><strong>From ${props.price}</strong></span> / person</p>
        </div>
    )
}

export default ActivityCard