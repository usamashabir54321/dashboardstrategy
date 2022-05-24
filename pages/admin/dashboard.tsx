import Head from 'next/head'
import Link from 'next/link'
import Layout from './layout.tsx'
import AdminHeader from './comp/AdminHeader.tsx'
import {useSelector} from 'react-redux'

export default function Page () {
	const adminReducerData = useSelector((state) => state.adminStore);
	const { auth_u } = adminReducerData;
	return (
		<>
			<Head>
				<title>Admin Dashboard Home | Dashboard Strategy</title>
				<meta name="Admin Home" content="Admin Home,Dashboard Strategy" />
			</Head>
			{/*PAGE HEADER*/}
			<AdminHeader pageTitle="Dashboard" />
			{/*PAGE BODY*/}
			<div className="d_content">
				<div className="d_grid gap_l_30 gap_s_20" style={{ gridTemplateColumns: '58% 40%' }}>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">About Our Company</h2><br />
						{
							auth_u.company ? <h4>{auth_u.company}</h4> :
							<div className="input_m_div m_t_20">
								<button className="btn_submit cursor_pointer"><Link href="profile">Save Company Info</Link></button>
							</div>
						}<br />
					</div>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">Mission</h2><br />
						{
							auth_u.mission ? <h4>{auth_u.mission}</h4> :
							<div className="input_m_div m_t_20">
								<button className="btn_submit cursor_pointer"><Link href="profile">Save Your Mission</Link></button>
							</div>
						}<br />
					</div>
				</div>
			</div>
			<div className="d_content">
				<div className="d_grid gap_l_30 gap_s_20" style={{ gridTemplateColumns: '40% 58%' }}>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">Profile</h2><br />
						<h4>Name : &nbsp; <b>{ auth_u ? auth_u.name : ''}</b></h4><br />
						<h4>Type : &nbsp; <b>{ auth_u ? auth_u.role : ''}</b></h4><br />
						<h4>Contact : &nbsp; <b>{ auth_u ? auth_u.contact : ''}</b></h4><br />
						<h4>Email : &nbsp; <b>{ auth_u ? auth_u.email : ''}</b></h4><br />
					</div>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">Vision</h2><br />
						{
							auth_u.vision ? <h4>{auth_u.vision}</h4> :
							<div className="input_m_div m_t_20">
								<button className="btn_submit cursor_pointer"><Link href="profile">Save Your Vision</Link></button>
							</div>
						}<br />
					</div>
				</div>
			</div>
		</>
	)
}

Page.layout = Layout