import Head from 'next/head'
import Link from 'next/link'
import Layout from './layout.tsx'
import AdminHeader from './comp/AdminHeader.tsx'

export default function Page () {
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
						<h4>
							From startups to enterprises, having access to business intelligence(BI)becomes one of the most important factors when it comes to staying ahead of the competition. From extracting, monitoring, analyzing, and delivering actionable data.
						</h4><br />
						<h4>
							it is important to create powerful visualizations. If the underlying information isn’t easy to access, analyze or understand, it becomes redundant.
						</h4><br />
					</div>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">Mission</h2><br />
						<h4>
							From startups to enterprises, having access
							to business  intelligence(BI)becomes one of the 
							most important factors  when it comes to staying
							ahead of the competition. From extracting, 
							monitoring, analyzing, and delivering actionable 
							data.
						</h4><br />
					</div>
				</div>
			</div>
			<div className="d_content">
				<div className="d_grid gap_l_30 gap_s_20" style={{ gridTemplateColumns: '40% 58%' }}>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">Profile</h2><br />
						<h4>Company Name : &nbsp; <b>Logistics & CO.</b></h4><br />
						<h4>Established : &nbsp; <b>2019</b></h4><br />
						<h4>Type : &nbsp; <b>Organizational Data</b></h4><br />
						<h4>CEO : &nbsp; <b>Mr. Rashid Al Baghdadi</b></h4><br />
						<h4>Net Worth : &nbsp; <b>$2m</b></h4><br />
					</div>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">Vision</h2><br />
						<h4>
							From startups to enterprises, having access to business intelligence(BI)becomes one of the most important factors when it comes to staying ahead of the competition. From extracting, monitoring, analyzing, and delivering actionable data.
						</h4><br />
						<h4>
							it is important to create powerful visualizations. If the underlying information isn’t easy to access, analyze or understand, it becomes redundant.
						</h4><br />
					</div>
				</div>
			</div>
		</>
	)
}

Page.layout = Layout