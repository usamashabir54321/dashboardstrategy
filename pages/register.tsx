import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Page (props) {
	let [ name, setName ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ email, setEmail ] = useState('');
	let [ contact, setContact ] = useState('');
	const router = useRouter();
	const handleSubmit = async ( e ) => {
		e.preventDefault();props.Swal.showLoading();
		const headers = {"Content-Type" : `multipart/form-data`};
		let data = new FormData();
		data.append( 'name', name );
		data.append( 'password', password );
		data.append( 'email', email );
		data.append( 'contact', contact );
		let result = await axios( {
			method:'post',
			url: 'api/register',
			data: data,
			headers: headers,
		});
		let response = result.data;
		props.Swal.close();
		if( response['message'] == 'double_email' ) props.Toast.fire({icon: 'error',title: 'This email is already registered.'});
		else if( response['message'] == 'success' ) {
			props.Toast.fire({icon: 'success',title: 'Registered successfully.'});
			var auth_token = response.data.token;
			setTimeout(() => {router.push('/login');},1000);
		}
	}
	return (
		<>
			<props.Head>
				<title>Register Now | Dashboard Strategy</title>
				<meta name="Sign Up" content="Sign Up,Dashboard Strategy" />
			</props.Head>
			<div className="logins_page" id="main">
				<div className="clearfix"></div>
				<div className="form_container">
					<div className="header text_center"><img src="assets/img/logo.png" alt="logo" /></div>
					<h3 className="form_title">Register</h3>
					<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
						<div className="input_icons m_b_20">
							<div className="icon"><img src="assets/fonts/user_icon.png" alt="user icon" /></div>
							<input onInput={ ( e ) => setName( e.target.value ) } className="input_field" type="text" placeholder="Name" required minLength="3" maxLength="30" />
						</div>
						<div className="input_icons m_b_20">
							<div className="icon"><img src="assets/fonts/lock_icon.png" alt="locked lock icon" /></div>
							<input onInput={ ( e ) => setPassword( e.target.value ) } className="input_field" type="password" placeholder="Password" required minLength="5" maxLength="20" />
						</div>
						<div className="input_icons m_b_20">
							<div className="icon"><img src="assets/fonts/email_icon.png" alt="email icon" /></div>
							<input onInput={ ( e ) => setEmail( e.target.value ) } className="input_field" type="email" placeholder="Email" required minLength="6" maxLength="30" />
						</div>
						<div className="input_icons m_b_20">
							<div className="icon"><img src="assets/fonts/phone_icon.png" alt="phone icon" /></div>
							<input onInput={ ( e ) => setContact( e.target.value ) } className="input_field" type="tel" placeholder="Contact" required minLength="5" maxLength="20" />
						</div>
						<div className="input_icons m_b_8 m_t_10 text_right">
							<input type="submit" name="submit" value="Sign Up" className="input_field btn_submit cursor_pointer" />
						</div>
						<div className="form_footer m_t_20 text_center">
							<props.Link href="login">
								<button className="btn btn_outline_primary">Sign In</button>
							</props.Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}