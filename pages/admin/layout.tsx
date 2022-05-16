import Link from 'next/link'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {setTheme} from '../../store/actions/themeActions'
import {setAuthUser} from '../../store/actions/adminActions'
import AdminFooter from './comp/AdminFooter.tsx'

export default function Layout ({children}) {
	const themeReducerData = useSelector((state) => state.themeChanger);
	const { themeMode } = themeReducerData;
	const [loader,setLoader] = useState(true);
	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
	    if (getCookie('themeMode')) dispatch(setTheme(getCookie('themeMode')));
	    if (!getCookie('auth_token')) router.push('/login');
	    setLoader(false);
	    axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('auth_token')}`;
	    axios.get('api/user').then(res => {
	    	if(res.data.id) dispatch(setAuthUser(res.data));
	    	else router.push('/login');
	    }).catch(err => {console.log('Un Authorization');});
	}, []);
	return (
		<>
			{/*MAIN LAYOUT*/}
			<div className={`dashboard_pages ${themeMode}`} id="main">
				{ loader ? <div id="main_loader"><div></div></div> :
					<div className="d_grid" style={{ gridTemplateColumns: '14% 86%' }}>
						{/*SIDE BAR*/}
						<div className="grid_item" id="d_menu_sidebar">
							<div className="sidebar_logo text_center"><img src="/assets/img/logo.png" alt="logo" /></div>
							<div className="sidebar_links">
								<ul id="main_ul">
									<li className={router.pathname == "/admin/dashboard" || router.pathname == "/admin/profile" ? "active" : ""}>
										<Link href="dashboard">
											<h4>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
													<path d="M16.7025 7.70526C16.585 7.36816 16.4408 7.03895 16.2725 6.72474L14.2275 7.59789C14.4083 7.90816 14.5525 8.23737 14.6583 8.57842L16.7025 7.70526ZM6.22583 6.99158C6.45167 6.71211 6.70833 6.45947 6.99083 6.23605L5.41583 4.68237C5.1425 4.91368 4.885 5.16711 4.65 5.43789L6.22583 6.99158ZM7.65417 5.79632C7.97083 5.62184 8.305 5.48368 8.6525 5.38342L7.79167 3.35526C7.44833 3.46737 7.11417 3.60553 6.79167 3.76895L7.65417 5.79632ZM5.355 8.65026C5.45583 8.30684 5.59417 7.97605 5.77 7.66342L3.71167 6.82184C3.54833 7.14 3.40833 7.47158 3.29667 7.80868L5.355 8.65026ZM13.2167 3.75553C12.8942 3.59368 12.5583 3.45632 12.2167 3.34579L11.3642 5.37711C11.7125 5.47579 12.0475 5.61316 12.3642 5.78684L13.2167 3.75553ZM15.3842 5.43789C15.15 5.16789 14.8925 4.91368 14.6192 4.68237L13.0433 6.23605C13.3267 6.45947 13.5833 6.71289 13.8092 6.99158L15.3842 5.43789ZM10.5583 3.02211C10.3758 3.00868 10.1942 3.00158 10.0183 3.00158C9.84083 3.00158 9.65833 3.00868 9.47667 3.02211V5.22C9.65667 5.20026 9.83833 5.19 10.0183 5.19C10.1975 5.19 10.38 5.20026 10.5583 5.22V3.02211ZM20 9.47368C20 4.24184 15.5225 0 10 0C4.4775 0 0 4.24184 0 9.47368C0 11.5129 0.68 13.4542 1.8375 15H18.1625C19.32 13.4542 20 11.5129 20 9.47368ZM12.4333 13.4211C12.4275 12.5637 11.9283 11.8176 11.1867 11.43L10.0183 6.24237L8.85 11.43C8.10917 11.8176 7.60917 12.5637 7.60333 13.4211H2.7525C2.04833 12.2368 1.66667 10.8616 1.66667 9.47368C1.66667 5.12053 5.405 1.57895 10 1.57895C14.595 1.57895 18.3333 5.12053 18.3333 9.47368C18.3333 10.8616 17.9517 12.2368 17.2475 13.4211H12.4333Z"/>
												</svg>
												Dashboard
											</h4>
										</Link>
									</li>
									<li className={router.pathname == "/admin/create-project" ? "active" : ""}>
										<Link href="create-project">
											<h4>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
													<path d="M9 0L0.75 4.5V13.5983L9 18L17.25 13.5983V4.54875L9 0V0ZM2.25 6.1725L8.25 9.44475V15.9L2.25 12.699V6.1725ZM9.75 15.9V9.45L15.75 6.24825V12.6982L9.75 15.9Z"/>
												</svg>
												Create Project
											</h4>
										</Link>
									</li>
									<li>
										<h4>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
												<path d="M13.5 0H18V4.5H13.5V0ZM0 18H12V0H0V18ZM13.5 11.25H18V6.75H13.5V11.25ZM13.5 18H18V13.5H13.5V18Z"/>
											</svg>
											View Projects
										</h4>
									</li>
								</ul>
							</div>
							<div className="sidebar_logo text_center"><img src="/assets/img/logo.png" alt="logo" /></div>
						</div>
						{/*CHANGING PAGE CONTENT*/}
						<div className="grid_item d_body">
							{children}
							{/*PAGE FOOTER*/}
							<AdminFooter />
						</div>
					</div>
				}
			</div>
		</>
	)
}