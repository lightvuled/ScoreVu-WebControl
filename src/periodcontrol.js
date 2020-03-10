import NumberControl from "./numbercontrol.js";

export default class PeriodControl extends React.Component {
	constructor(props)
	{
		super(props);
	}

	renderButton(value, command, amount)
	{
		let label = React.createElement("img", {src: "./assets/"+value+".png"});
		return React.createElement(
			"button",
			{
				onClick: () => this.props.onClick({control:command, value: amount}),
				key: "period"+amount
			},
			label
		);
	}

	render()
	{
		const buttons = [];

		buttons.push(React.createElement(
			"div",
			{key: "periodBtns"},
			this.renderButton("ArrowUp", "period", 1),
			this.renderButton("Reset", "periodReset", 0)
		));

		buttons.push(this.renderButton("ArrowDown", "period", -1));

		return React.createElement(NumberControl, {
			className: "period",
			label:     this.props.label,
			color:     "green",
			value:     this.props.value,
			buttons:   buttons
		});
	}
}
