import PeriodControl from "./periodcontrol.js";
import ShotClockControl from "./shotclockcontrol.js";

export default class GameTimeControl extends React.Component {
	constructor(props) {
		super(props);
	}

	renderButton(label, image, command) {
		return React.createElement(
			"button",
			{onClick: () => this.props.onClick({control:command, value:0})},
			image ? React.createElement("img", {src: `./assets/${label}.png`}) : label,
		);
	}

	render() {
		return React.createElement(
			"div",
			{className: "gameTime"},
			React.createElement("div", {className: "gameClock"},
				React.createElement("div", {className: "clock color-orange"}, this.props.data.clockLeft+this.props.data.clockMiddle+this.props.data.clockRight),
				React.createElement("div", {},
					this.renderButton("Play",  true, "clockStartStop"),
					this.renderButton("Reset", true, "clockReset"),
				),
				this.renderButton("Horn", false, "playHorn"),
			),
			React.createElement("div", {},
				React.createElement(PeriodControl, {label: "Period", value: this.props.data.period, onClick: (ev) => this.props.onClick(ev)}, "period"),
				React.createElement(ShotClockControl, {label: "ShotClock", value: this.props.data.shotClock, onClick: (ev)=>this.props.onClick(ev)}),
			),
			React.createElement("div", {className: "possession"},
				"Possession",
				React.createElement("div", {},
					React.createElement("button", {onClick: (ev) => this.props.onClick({control:"possLeft",  value:0, className: this.props.data.poss == "left"  ? "active" : "",})}, "Left"),
					React.createElement("button", {onClick: (ev) => this.props.onClick({control:"possClr",   value:0})}, "Clear"),
					React.createElement("button", {onClick: (ev) => this.props.onClick({control:"possRight", value:0, className: this.props.data.poss == "right" ? "active" : "",})}, "Right")
				),
				this.renderButton("Cancel Timeout", false, "cancelTimeOut"),
			),
		);
	}
}
