export default class NumberControl extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return React.createElement(
			"div",
			{className: "numberControl "+this.props.className},
			React.createElement("div", {className: "label"}, this.props.label),
			React.createElement("div", {className: "counter color-"+this.props.color}, this.props.value),
			React.createElement("div", {className: "buttons"}, this.props.buttons),
		);
	}
}
