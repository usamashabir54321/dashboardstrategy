import { useRouter } from 'next/router'
import { removeCookies } from 'cookies-next';
import {useSelector, useDispatch} from 'react-redux'
import {changeTheme} from '../../../store/actions/themeActions'
import {setSideBar} from '../../../store/actions/adminActions'
import {useState} from 'react'
import axios from 'axios'

export default function Comp ({pageTitle,props}) {
	const themeReducerData = useSelector((state) => state.themeChanger);
	const adminReducerData = useSelector((state) => state.adminStore);
	const { themeMode } = themeReducerData;
	const { auth_u,openSideBar } = adminReducerData;
	const dispatch = useDispatch();
	const router = useRouter();
	const logoutMe = () => {
		props.Swal.showLoading();
		axios.get('api/only_get/logoutMe').then(res => {
			router.push('/login');
			removeCookies('auth_token');
			props.Swal.close();
		});
	};
	return (
		<div className="card m_t_25" id="admin_header">
			<div className="d_grid" style={{ gridTemplateColumns: '50% 50% 0%' }}>
				<div className="grid_item"><h1>{pageTitle}</h1></div>
				<div className="grid_item text_right cursor_pointer" id="u_g_info">
					{auth_u ? 
						<div className="d_flex" style={{float: 'right'}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" id="change_theme_btn" onClick={() => dispatch(changeTheme(themeMode))}>
								<path d="M13 9.75C14.7918 9.75 16.25 11.2082 16.25 13C16.25 14.7918 14.7918 16.25 13 16.25V9.75ZM13 7.58333C10.0078 7.58333 7.58333 10.0078 7.58333 13C7.58333 15.9922 10.0078 18.4167 13 18.4167C15.9922 18.4167 18.4167 15.9922 18.4167 13C18.4167 10.0078 15.9922 7.58333 13 7.58333ZM8.46733 6.93442L4.57492 3.04092L3.042 4.57275L6.93658 8.46733C7.371 7.88558 7.88558 7.36992 8.46733 6.93442ZM13 5.41667C13.3683 5.41667 13.728 5.45242 14.0833 5.50333V0H11.9167V5.50333C12.272 5.45242 12.6317 5.41667 13 5.41667ZM19.0645 8.46625L22.9591 4.57167L21.4272 3.03983L17.5327 6.93442C18.1144 7.36992 18.629 7.88558 19.0645 8.46625ZM5.41667 13C5.41667 12.6317 5.45242 12.272 5.50333 11.9167H0V14.0833H5.50333C5.45242 13.728 5.41667 13.3683 5.41667 13ZM17.5338 19.0645L21.4272 22.9569L22.9602 21.4251L19.0667 17.5327C18.6301 18.1133 18.1144 18.629 17.5338 19.0645ZM6.93442 17.5327L3.042 21.4251L4.57383 22.9569L8.46625 19.0645C7.88558 18.629 7.371 18.1144 6.93442 17.5327ZM20.4967 11.9167C20.5476 12.272 20.5833 12.6317 20.5833 13C20.5833 13.3683 20.5476 13.728 20.4967 14.0833H26V11.9167H20.4967ZM13 20.5833C12.6317 20.5833 12.272 20.5476 11.9167 20.4967V26H14.0833V20.4967C13.728 20.5476 13.3683 20.5833 13 20.5833Z"/>
							</svg>
							<div className="infor_text m_r_20">
								<h4><b>{auth_u.name}</b></h4>
								<h5>{auth_u.role}</h5>
							</div>
							<div>
								{
									auth_u.img_path ? <img src={axios.defaults.baseURL+auth_u.img_path} alt="image" className="avatar" /> :
									<img src="/assets/img/admin_avatar.png" alt="image" className="avatar" />
								}
							</div>
							<div id="menu-bar-toggle" onClick={() => dispatch(setSideBar(!openSideBar))}>
								{
									openSideBar ? <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="24px" height="24px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
									: <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
								}
							</div>
						</div>
						: ''
					}
					<div className="links_dropdown">
						<div className="dropdown_content">
							<ul className="dropdown_ul">
								<li>
									<props.Link href="profile">
										<button>
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15">
												<path d="M4.45437 14.1012L0 15L0.89875 10.545L4.45437 14.1012ZM5.33813 13.2175L12.3556 6.20188L8.79938 2.64437L1.7825 9.66125L5.33813 13.2175ZM11.4431 0L9.68312 1.76062L13.24 5.3175L15 3.55562L11.4431 0V0Z"/>
											</svg>
											 &nbsp; Edit Profile
										</button>
									</props.Link>
								</li>
								<li>
									<button>
										<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
											<path d="M16 9.07733V6.92267C14.8993 6.53133 14.204 6.42133 13.854 5.57667V5.576C13.5027 4.72867 13.9207 4.15333 14.4187 3.10467L12.8953 1.58133C11.8547 2.076 11.2733 2.498 10.424 2.146H10.4233C9.57733 1.79533 9.46667 1.09533 9.07733 0H6.92267C6.53467 1.09 6.42333 1.79467 5.57667 2.146H5.576C4.72867 2.498 4.15467 2.08067 3.10467 1.58133L1.58133 3.10467C2.078 4.15 2.498 4.72733 2.146 5.576C1.79467 6.42333 1.09 6.53467 0 6.92267V9.07733C1.088 9.464 1.79467 9.57667 2.146 10.4233C2.49933 11.278 2.07 11.8673 1.58133 12.8947L3.10467 14.4187C4.146 13.9233 4.72733 13.502 5.576 13.854H5.57667C6.42333 14.2047 6.534 14.9067 6.92267 16H9.07733C9.46533 14.9093 9.57733 14.2067 10.4287 13.852H10.4293C11.2707 13.5027 11.8427 13.9193 12.8947 14.4193L14.418 12.8953C13.922 11.8533 13.5013 11.2733 13.8527 10.4247C14.204 9.57733 14.9113 9.46467 16 9.07733ZM8 10.6667C6.52733 10.6667 5.33333 9.47267 5.33333 8C5.33333 6.52733 6.52733 5.33333 8 5.33333C9.47267 5.33333 10.6667 6.52733 10.6667 8C10.6667 9.47267 9.47267 10.6667 8 10.6667Z"/>
										</svg>
										 &nbsp; Setting
									</button>
								</li>
								<li>
									<button onClick={logoutMe}>
										<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 19">
											<path d="M5.25 6.33333L2.25 6.33333L7.5 -3.27835e-07L12.75 6.33333L9.75 6.33333L9.75 12.6667L5.25 12.6667L5.25 6.33333ZM12.75 7.91667L12.6878 7.91667C13.2015 8.84925 13.5 9.92908 13.5 11.0833C13.5 14.5754 10.8083 17.4167 7.5 17.4167C4.19175 17.4167 1.5 14.5754 1.5 11.0833C1.5 9.92908 1.7985 8.84925 2.31225 7.91667L0.6285 7.91667C0.2265 8.88725 -3.95291e-07 9.95679 -3.46049e-07 11.0833C-1.54961e-07 15.4549 3.35775 19 7.5 19C11.6423 19 15 15.4549 15 11.0833C15 9.95679 14.7735 8.88725 14.3715 7.91667L12.75 7.91667Z"/>
										</svg>
										 &nbsp; Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
