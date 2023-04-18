import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * A Login form for returning users.
 * @TODO redirect to main page on login.
 */
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emailID: '',
			password: '',
			loggedIn: false,
			isAdmin: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.signedInUser();
		// on login, window.location.reload(); so that app.jsx can show the correct menu options.
	}

	/**
	 * See if user is signed in. If so, open the new ride form. If not, prompt them to sign in.
	 */
	signedInUser() {
		const uri = `https://poolnride-api.onrender.com//user/checktoken`;

		const self = this;

		fetch(uri, {
			method: 'POST',
		})
			.then(function (response) {
				// Check if login worked. If not, then show not logged in.
				if (response.status == 404 || response.status == 401) {
					self.setState((state) => ({
						loggedIn: false,
					}));
				}
				return response.json();
			})
			.then(function (signinResult) {
				// If there is a user signed in, set loggedIn to true and reload the page.
				if (signinResult.success) {
					self.setState((state) => ({
						loggedIn: true,
					}));
				}
			})
			.catch(function (err) {
				console.log('Request failed', err);
			});
	}

	/**
	 * Update state when values are changed.
	 * @param {*} event
	 */
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	/**
	 * When user submits the form.
	 *
	 * @TODO sanitize the data, notify user of errors, and make a post request here to create a new user.
	 */
	handleSubmit(event) {
		event.preventDefault();

		// First make sure appropriate data is passed in.
		if (!this.state.emailID) {
			alert('Must enter a valid email address.');
		} else if (!this.state.password) {
			alert('Enter in your password!');
		} else {
			// Make the post request
			const uri = `https://poolnride-api.onrender.com//user/login`;
			// const uri = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'

			const formdata = JSON.stringify(this.state);
			// remove this line when cleaning out code.
			self = this;

			fetch(uri, {
				method: 'POST',
				body: formdata,
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(function (response) {
					console.log('logged in');
					if (response.status !== 200) {
						alert(
							"Sorry, we couldn't find someone with that email and password."
						);
					} else {
						return response.json();
					}
				})
				.then(function (jsonresponse) {
					// If successful.
					console.log(jsonresponse.token);
					if (
						self.state.isAdmin == false &&
						self.state.emailID === 'admin@gmail.com' &&
						self.state.password === 'admin'
					) {
						console.log('in elseif');
						self.setState((state) => ({
							isAdmin: true,
						}));
					}
					// window.location.reload();
					self.setState((state) => ({
						loggedIn: true,
					}));
					window.location.reload();
				})
				.catch(function (err) {
					console.log('Request failed', err);
				});
		}
	}

	render() {
		if (this.state.loggedIn && this.state.isAdmin === false) {
			console.log('render in if');
			return <Redirect to="/" />;
		} else if (this.state.loggedIn && this.state.isAdmin === true) {
			console.log('render in else if');
			return <Redirect to="/admin" />;
		}
		return (
			<div className="LoginContainer">
				<h1 className="formInput">Welcome back!</h1>
				{/* <this.Errors /> */}
				<form className="LoginForm" onSubmit={this.handleSubmit}>
					<label className="LoginFormInput">Email Address</label>
					<input
						type="text"
						name="emailID"
						value={this.state.emailID}
						onChange={this.handleChange}
					/>

					<label className="LoginFormInput">Password</label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>

					<input className="LoginFormInput" type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Login;
