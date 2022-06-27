import { useRouter } from 'next/router'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { setCookies, getCookie } from 'cookies-next';

export default function Page (props) {
	let [ email, setEmail ] = useState('');
	let [ allowPassComp, setAllowPassComp ] = useState(false);
	let [ password, setPassword ] = useState('');
	let [ confirmPassword, setConfirmPassword ] = useState('');
	const router = useRouter();
	useEffect(() => {
		if (getCookie('auth_token')) router.push('/admin/dashboard');
	},[]);
	const handleSubmitEmail = async ( e ) => {
		e.preventDefault();props.Swal.showLoading();
		axios.get('api/webGetById/check_if_email/'+email).then(res => {
			props.Swal.close();
			if (res.data == 1) setAllowPassComp(true);
			else props.Toast.fire({icon: 'error',title: 'No email account has founded on this email.'});
		});
	}
	const handleSubmitNewPass = async ( e ) => {
		e.preventDefault();
		if ( password == confirmPassword ) {
			props.Swal.showLoading();
			let data = new FormData();
			data.append( 'email', email );
			data.append( 'password', password );
			axios.post('api/webPost/set_new_password',data).then(res => {
				if (res.data == 1) props.Toast.fire({icon: 'success',title: 'New password setted successfully.'});
				props.Swal.close();
				setTimeout(() => {router.push('/login');},1000);
			});
		} else props.Toast.fire({icon: 'warning',title: 'Password and confirm password is not matching.'});
	}
	return (
		<>
			<props.Head>
				<title>Forget Password | Dashboard Strategy</title>
				<meta name="Forget Password" content="Forget Password,Dashboard Strategy" />
			</props.Head>
			<div className="logins_page" id="main">
				<div className="clearfix"></div>
				<div className="form_container">
					<div className="header text_center"><img src="assets/img/logo.png" alt="logo" /></div>
					{
						allowPassComp ?
						<>
							<h3 className="form_title">Set New Password</h3>
							<form onSubmit={ ( e ) => handleSubmitNewPass( e ) } action="" method="post">
								<div className="input_icons m_b_20">
									<div className="icon"><img src="assets/fonts/lock_icon.png" alt="locked lock icon" /></div>
									<input onInput={ ( e ) => setPassword( e.target.value ) } className="input_field" type="password" placeholder="Password" required minLength="5" maxLength="20" />
								</div>
								<div className="input_icons m_b_20">
									<div className="icon"><img src="assets/fonts/lock_icon.png" alt="locked lock icon" /></div>
									<input onInput={ ( e ) => setConfirmPassword( e.target.value ) } className="input_field" type="password" placeholder="Confirm Password" required minLength="5" maxLength="20" />
								</div>
								<br />
								<div className="input_icons m_b_8">
									<input type="submit" name="submit" value="Set New Password" className="input_field btn_submit cursor_pointer" />
								</div>
							</form>
						</>
						:
						<>
							<h3 className="form_title">Forget Password</h3>
							<form onSubmit={ ( e ) => handleSubmitEmail( e ) } action="" method="post">
								<div className="input_icons m_b_20">
									<div className="icon"><img src="assets/fonts/user_icon.png" alt="user icon" /></div>
									<input onInput={ ( e ) => setEmail( e.target.value ) } className="input_field" type="email" placeholder="Email" name="email" required minLength="10" maxLength="30" />
								</div>
								<br />
								<div className="input_icons m_b_8">
									<input type="submit" name="submit" value="Request New Password" className="input_field btn_submit cursor_pointer" />
								</div>
							</form>
						</>
					}
					<div className="form_footer m_t_30 text_center">
						<props.Link href="login">
							<button className="btn btn_outline_primary">Sign In</button>
						</props.Link>
					</div>
				</div>
			</div>
		</>
	)
}
