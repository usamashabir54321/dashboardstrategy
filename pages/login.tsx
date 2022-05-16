import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import Image from 'next/image'
import { setCookies, getCookie } from 'cookies-next';
import Validation from './admin/comp/Validation'

export default function Page () {
	let [ alert, setAlert ] = useState('');
	const [loader,setLoader] = useState(true);
	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');
	const router = useRouter();
	useEffect(() => {
		if (getCookie('auth_token')) router.push('/admin/dashboard');
		setLoader(false);
	},[]);
	const handleSubmit = async ( e ) => {
		e.preventDefault();
		const headers = {"Content-Type" : `multipart/form-data`};
		let data = new FormData();
		data.append( 'email', email );
		data.append( 'password', password );
		let result = await axios( {
			method:'post',
			url: 'api/login',
			data: data,
			headers: headers,
		});
		let response = result.data;
		if( response['message'] == 'error' ) setAlert('login_err');
		else if( response['message'] == 'validate_err' ) {setAlert('some_missing');}
		else if( response['message'] == 'success' ) {
			setAlert('login_succ');
			var auth_token = response.data.token;
			setCookies('auth_token', auth_token);
			setTimeout(() => {router.push('/admin/dashboard');},1000);
		}
		setTimeout(() => {setAlert('');},1000);
	}
	return (
		<>
			<Head>
				<title>Login | Dashboard Strategy</title>
				<meta name="Login" content="Login,Dashboard Strategy" />
			</Head>
			<Validation alert={alert} />
			{ loader ? <div id="main_loader"><div></div></div> :
				<div className="logins_page" id="main">
					<div className="clearfix"></div>
					<div className="form_container">
						<div className="header text_center"><Image src="assets/img/logo.png" alt="logo" /></div>
						<h3 className="form_title">Login</h3>
						<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
							<div className="input_icons m_b_20">
								<div className="icon"><Image src="assets/fonts/user_icon.png" alt="user icon" /></div>
								<input onInput={ ( e ) => setEmail( e.target.value ) } className="input_field" type="email" placeholder="Email" name="email" required minLength="10" maxLength="30" />
							</div>
							<div className="input_icons m_b_20">
								<div className="icon"><Image src="assets/fonts/lock_icon.png" alt="locked lock icon" /></div>
								<input onInput={ ( e ) => setPassword( e.target.value ) } className="input_field" type="password" placeholder="Password" name="password" required minLength="5" maxLength="20" />
							</div>
							<br />
							<div className="input_icons m_b_8">
								<input type="submit" name="submit" value="Login" className="input_field btn_submit cursor_pointer" />
							</div>
							<p className="m_b_20 text_center text_white forgot_pass"><small>Forget Password?</small></p>
							<div className="form_footer m_t_30 text_center">
								<Link href="register">
									<button className="btn btn_outline_primary">Signup</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			}
		</>
	)
}
