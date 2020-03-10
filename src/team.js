import ScoreControl from "./scorecontrol.js";

export default class Team extends React.Component {
	constructor(props) {
		super(props);
		this.state = { team: props.team, name: props.data.name}
	}

	render() {
		return React.createElement(
			'div',
			{team: this.props.team, className: "team "+this.props.team},
			React.createElement("h2", {}, this.props.data.name),
			//Score
			React.createElement(ScoreControl, {value: this.props.data.score, team: this.props.team, color: "orange", control: "Score",   number: 3, onClick: (e)=>this.props.onClick(e)}),
			//Fouls
			React.createElement(ScoreControl, {value: this.props.data.fouls, team: this.props.team, color: "green", control: "Fouls",   number: 1, onClick: (e)=>this.props.onClick(e)}),
			//Time Outs
			React.createElement(ScoreControl, {value: this.props.data.tol,   team: this.props.team, color: "green", control: "TimeOuts",number: 1, onClick: (e)=>this.props.onClick(e)}),
			React.createElement("button", {
				onClick: (ev)=>this.props.onClick({
					control: this.props.team+"TimeOut",
					value: 0
				})
			},
			"Timeout"
			),
		);
	}
}
