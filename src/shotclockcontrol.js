import NumberControl from "./numbercontrol.js";

export default class ShotClockControl extends React.Component {
	constructor(props) {
		super(props);
	}

	renderButton(label, image, command) {
		return React.createElement(
			"button",
			{
				onClick: () => this.props.onClick({control: "shotClock" + command, value: 0}),
				value: command,
				key:"ShotClock"+command
			},
			image ? React.createElement("img", {src: "./assets/"+ label + ".png"}) : label,
		);
	}

	render() {
		const buttons = [];
		buttons.push(React.createElement("div", {key: "shotClockBtns"},
			this.renderButton("Play",  true, "StartStop"),
			this.renderButton("Reset", true, "Reset")));
		buttons.push(this.renderButton("1/2", false, "ResetShort"));

		let value = parseFloat(this.props.value);
		if (value > 10)
			value = parseInt(value);
		else
			value = value.toFixed(1)+"";

		return React.createElement(NumberControl, {className: "shotclock", label: this.props.label, color: "red", value: value, buttons: buttons});
	}
}

