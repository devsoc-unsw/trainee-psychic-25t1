export default function LeaderBoard(props) {
	function organise_data() {
		const data = props.scores;
		const sorted_data = data.sort((a, b) => b.score - a.score);
	
		return sorted_data.map((item, index) => (
			<tr key={item.id}>
				<th>{index + 1}</th>
				<td>{item.name}</td>
				<td>{item.score}</td>
			</tr>
		));
	}	

	return (
		<div className="overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
				<tr>
					<th>Rank</th>
					<th>Name</th>
					<th>Score</th>
				</tr>
				</thead>
				<tbody>
				{/* row 1 */}
				{organise_data()}
				</tbody>
			</table>
		</div>
	)
}