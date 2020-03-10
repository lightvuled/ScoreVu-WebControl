import NumberControl from "./numbercontrol.js";

export default class ScoreControl extends React.Component {
	constructor(props)
	{
		super(props);
	}

	handleClick(command="", value)
	{
		this.props.onClick({
			control: this.props.team + this.props.control + command,
			value: value
		});
	}

	renderLabel(value, image = null)
	{
		let src = `./assets/${value}.png`;
		if (image != null) {
			let dir = value < 0 ? "Down" : "Up";
			src = "./assets/Arrow" + dir + Math.abs(value) + ".png";
		}

		return React.createElement("img", {src: src});
	}

	renderButton(value, image=null)
	{
		let click = () => this.handleClick("", value);
		if (image == null)
			click = () => this.handleClick(value, 0);
		return React.createElement(
			"button",
			{
				onClick: click,
				key: this.props.team + this.props.control + value
			},
			this.renderLabel(value, image),
		);
	}

	render()
	{
		const buttons = [];
		const btn1 = [];
		const btn2 = [];

		for (let i = 1; i <= this.props.number; i++)
			btn1.push(this.renderButton(i, i));

		btn2.push(this.renderButton(-1, -1));

		if (this.props.number == 1)
			btn1.push(this.renderButton("Reset"));
		else
			btn2.push(this.renderButton("Reset"));

		buttons.push(React.createElement("div", {key: this.props.team + this.props.control + "btn1"}, btn1));
		buttons.push(React.createElement("div", {key: this.props.team + this.props.control + "btn2"}, btn2));

		return React.createElement(
			NumberControl,
			{
				label: this.props.control,
				color: this.props.color,
				value: this.props.value,
				buttons: buttons
			}
		);
	}
}
