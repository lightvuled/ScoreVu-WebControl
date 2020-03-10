import ConnectionForm from "./connectionform.js";
import GameTimeControl from "./gametimecontrol.js";
import Team from "./team.js";

const CONNECTION = { DISCONNECTED: 0, CONNECTED: 1, CONNECTING: 2, DISCONNECTING: 3 };

//  key = ['D','E','F','A','U','L','T','K','E','Y','_','V','A','L','U','E'];
//  key = [104,105,106,101,125,114,124,113,105,131,055,126,101,114,125,105];
var key = "DEFAULTKEY_VALUE";

class Game extends React.Component {
	constructor(props) {
		let connecting = CONNECTION.DISCONNECTED;
		let lastip = null;
		let lastkey = null;
		const cookies = document.cookie.split(";").map( i => i.split("=") ).forEach( i => {
			if (i[0] == "lastsuccess") {
				connecting = CONNECTION.CONNECTING;
				let value = decodeURIComponent(i[1]).split("=");
				lastip = value[0];
				lastkey = value[1];
			}
		});
		

		super(props);
		this.state = {
			isConnected: connecting, //CONNECTION.DISCONNECTED,
			socket: null,
			aeskey: lastkey, //"DEFAULTKEY_VALUE",
			aesEcb: null,
			ip:     lastip, //"localhost",
			game:   {clockLeft: "0", clockMiddle: ":", clockRight: "0", shotClock: "24.00", period: 1},
			home:   {name:"", score:0, fouls:0, poss:false, tol:0},
			away:   {name:"", score:0, fouls:0, poss:false, tol:0}
		};
		window.addEventListener("beforeunload", (ev) => this.onUnload(ev));
	}

	onUnload(ev) {
		this.setState({isConnected: CONNECTION.DISCONNECTING});
		if (this.state.socket == undefined) { return; }
		if (this.state.socket.readyState != WebSocket.OPEN) { return; }
		let text = "{\"command\":\"closeSocket\",\"data\":\"\",\"amount\":0}";
		this.state.socket.send(text);
		this.state.socket.close();
	}

	webCommand(command, data, amount) {
		return "{\"command\":\""+command+"\",\"data\":\""+data+"\",\"amount\":"+amount+"}";
	}

	encrypt(message, key) {
		var textBytes, padded, encryptedBytes, pressed;
		var rev, bytes, split, decrypt, strip;
		let aesEcb;
		const aesey = this.state.aeskey;

		if (this.state.aesEcb == null) {
			aesEcb = new aesjs.ModeOfOperation.ecb(aesey);
			this.setState({aesEcb: aesEcb});
		} else {
			aesEcb = this.state.aesEcb;
		}

		textBytes = aesjs.utils.utf8.toBytes(message);

		padded = aesjs.padding.pkcs7.pad(textBytes);
		encryptedBytes = aesEcb.encrypt(padded);

		pressed = base64js.fromByteArray(aesEcb.encrypt(aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(message))));
		return pressed;
	}

	onConnection(sock, aeskey, ip) {
		sock.onopen = ev => this.onOpen(ev);
		sock.onmessage = ev => this.onReceive(ev);
		sock.onclose = ev => this.onClose(ev);
		this.setState({socket: sock, aeskey: aeskey, ip: ip, isConnected: CONNECTION.CONNECTING});

		return;
	}

	onOpen(ev) {
		const text = this.webCommand("handshake", "", 0);
		this.state.socket.send(this.encrypt(text, this.state.key));
		this.setState({isConnected: CONNECTION.CONNECTED});

		document.cookie = "lastsuccess="+encodeURIComponent(this.state.ip+"="+this.state.aeskey);

		return;
	}

	onClick(ev) {
		const text = this.webCommand(ev.control, "", ev.value);
		this.state.socket.send(this.encrypt(text, this.state.key));
		return;
	}

	onClose(ev) {
		if (this.state.isConnected == CONNECTION.CONNECTED) {
			alert("Connection to scoreboard has been lost.");
		} else if (this.state.isConnected == CONNECTION.DISCONNECTING) {

		} else {
			alert("Failed to connect to scoreboard.");
		}
		this.setState({socket: null, isConnected: CONNECTION.DISCONNECTED});
	}

	onReceive(ev) {
		if (ev.data == "BasketBall\n") return;
		const data = JSON.parse(ev.data);

		data.game.poss = data.away.poss == "true" ? "right" : data.home.poss == "true" ? "left" : null;

		this.setState({game: data.game, home: data.home, away: data.away});
		return;
	}

	render() {
		if (this.state.isConnected == CONNECTION.CONNECTED) {
			return React.createElement(
				"div",
				{},
				React.createElement(GameTimeControl,    {data: this.state.game, onClick: (ev)=>this.onClick(ev)}),
				React.createElement(Team, {team: "away", data: this.state.away, onClick: (ev)=>this.onClick(ev)}),
				React.createElement(Team, {team: "home", data: this.state.home, onClick: (ev)=>this.onClick(ev)}),
			);
		//} else if (this.state.isConnected == CONNECTION.CONNECTING) {
			//return React.createElement("div", {}, "Attempting to connect to last successful connection...");
		} else {
			return React.createElement(ConnectionForm, {aeskey: this.state.aeskey, ip: this.state.ip, onConnect: (ev, ea, eb)=>this.onConnection(ev, ea, eb)});
		}
	}
}

const domContainer = document.getElementById("scorevu_form");
ReactDOM.render(React.createElement(Game), domContainer);
