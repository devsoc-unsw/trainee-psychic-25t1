


export default function LeaderBoard(props) {
    function organise_data() {
        const data = props.scores;
        const sorted_data = data.sort((a, b) => b.score - a.score);
        
        return sorted_data.map(
            (item, index) => <div key={item.id}className="flex">
                <div className="w-20 flex-none text-3xl">
                    {index + 1}
                </div>
                <div className="w-30 flex-1 text-3xl pl-5">{item.name}</div>
                <div className="w-32 flex-1 text-3xl">{item.score}</div>
            </div>
        )
    }   

    return (
        <div>
            <div className="flex">
                <div className="w-20 flex-none text-xl">Rank</div>
                <div className="w-30 flex-1 text-xl text-center">Name</div>
                <div className="w-32 flex-1 text-xl">Score</div>
            </div>
            {organise_data()}
        </div>     
    )
}