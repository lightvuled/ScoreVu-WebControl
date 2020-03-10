export default class ConnectionForm extends React.Component {
	constructor(props) {
		super(props);
		//if (this.props.ip != null && this.props.aeskey != null)
			//this.handleClick(

	}

	handleClick(ev) {
		ev.preventDefault();
		const form = ev.target.parentElement.parentElement;
		const ip = form.children[0].children[0].value;
		const aeskey = form.children[1].children[0].value;
		let socket = new WebSocket('ws://'+ip+':8888');
		//socket.onmessage = parseMessage;
		this.props.onConnect(socket, aeskey, ip);
	}

	render() {
		const key = this.props.aeskey;
		const ip = this.props.ip;

		return React.createElement(
			"div",
			{className: "connectionForm"},
			React.createElement("div", {}, React.createElement("input", {placeholder: "IP Address", defaultValue: this.props.ip})),
			React.createElement("div", {}, React.createElement("input", {placeholder: "Key", defaultValue: this.props.aeskey})),
			React.createElement("div", {}, React.createElement("button",
				{onClick: (ev)=>this.handleClick(ev)},
				"Connect"))
		);
	}
}
