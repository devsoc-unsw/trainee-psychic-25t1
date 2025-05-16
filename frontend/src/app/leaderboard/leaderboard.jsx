


export default function LeaderBoard(props) {

    function organise_data() {
        const data = props.scores;
        const sorted_data = data.sort((a, b) => b.score - a.score);
        
        return sorted_data.map(
            (item, index) => <div className="grid grid-cols-3">
                <div>{index + 1}</div>
                <div>{item.name}</div>
                <div>{item.score}</div>
            </div>
        )
    }   

    return (
        <div>
            <div className="grid grid-cols-3">
                <div>Rank</div>
                <div>Name</div>
                <div>Score</div>
            </div>
            {organise_data()}
        </div>     
    )
}