import React from 'react';

import '../static/css/bootstrap.css'
import './list.css'


class MessageForm extends React.Component {
	constructor (props) {
		const chatId = props.id;
		super(props);
		let newHistory;
		try {
			newHistory = Array.from(JSON.parse(window.localStorage.getItem(chatId)));
		} catch (err) {
			newHistory = [];
		}
		this.state = ({
			colors: ['color1', 'color2', 'color3', 'color4'],
			nextColor: 0,
			message: '',
			user: window.localStorage.getItem('user') || 'Anonymous',
			history: newHistory,
		});
	}

	handleFormChange = (event) => {
		this.setState({
			message: event.target.value,
		});
	}

	handleSubmit = (event) => {
		const currentUser = window.localStorage.getItem('user') || 'Anonymous';
		const message = this.state.message;
		const history = this.state.history.slice();
		const colors = this.state.colors;

		if (currentUser !== this.state.user) {
			this.setState({
				nextColor: (this.state.nextColor + 1) % this.state.colors.length,
			});
		}

		let formData = new FormData();
		formData.append('username', currentUser);
		formData.append('message', message);
		fetch('https://httpbin.org/anything', {
		  method: 'POST',
		  body: formData
		}).then(response => response.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));

		let newHistory = history.concat([{
				      	user: currentUser,
				      	message: message,
				      	colorClass: colors[this.state.nextColor],
				      }]);
		console.log(newHistory);
		this.setState({
			history: newHistory,
		});
		window.localStorage.setItem(this.props.id, JSON.stringify(newHistory));

		event.preventDefault();
	}

	render() {
		const history = this.state.history;
		const chatHistory = history.map((item, key) => {
			return (
        <li key={key} className="color1">
          {item.user} said: {item.message}
        </li>
      );
		});
		/*TODO: set color*/

		return (
			<form>
				<div className="form-group">
					<ul className="chat">
						{chatHistory}
					</ul>
					<input 
					 className="form-control" 
					 name="message_text" 
					 placeholder="Start typing..."
					 onChange={this.handleFormChange} 
					/>
				</div>
				<input 
				 className="btn btn-primary float-sm-none float-md-right" 
				 type="submit" 
				 onClick={this.handleSubmit} 
				/>
			</form>
		);
	}
}

export default MessageForm;