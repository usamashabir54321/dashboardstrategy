import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { setCookies, getCookie } from 'cookies-next';
import Validation from './admin/comp/Validation'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function Page () {
	let [ email, setEmail ] = useState('');
	let [ allowPassComp, setAllowPassComp ] = useState(false);
	let [ alert, setAlert ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ confirmPassword, setConfirmPassword ] = useState('');
	const [reqPending,setReqPending] = useState(false);
	const router = useRouter();
	useEffect(() => {
		if (getCookie('auth_token')) router.push('/admin/dashboard');
	},[]);
	const handleSubmitEmail = async ( e ) => {
		e.preventDefault();setReqPending(true);
		axios.get('api/webGetById/check_if_email/'+email).then(res => {
			if (res.data == 1) setAllowPassComp(true);
			else setAlert('no_email_account');
			setReqPending(false);
			setTimeout(() => {setAlert('');},1000);
		});
	}
	const handleSubmitNewPass = async ( e ) => {
		e.preventDefault();
		if ( password == confirmPassword ) {
			setReqPending(true);
			let data = new FormData();
			data.append( 'email', email );
			data.append( 'password', password );
			axios.post('api/webPost/set_new_password',data).then(res => {
				if (res.data == 1) setAlert('new_pass_setted');
				setReqPending(false);
				setTimeout(() => {router.push('/login');},1000);
			});
		} else {
			setAlert('pas_confrim_pas_fail');
			setTimeout(() => {setAlert('');},1000);
		}
	}
	return (
		<>
			<Head>
				<title>Forget Password | Dashboard Strategy</title>
				<meta name="Forget Password" content="Forget Password,Dashboard Strategy" />
			</Head>
			<Validation alert={alert} />
			<div className="logins_page" id="main">
				{reqPending ? <SkeletonTheme baseColor="white" highlightColor="green"><Skeleton count={1} height={3} style={{ position: 'absolute',top: '0%' }}/></SkeletonTheme> : ''}
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
						<Link href="login">
							<button className="btn btn_outline_primary">Sign In</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
