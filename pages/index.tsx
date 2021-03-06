import { useState, useEffect, useRef } from 'react';

export default function Page (props) {
	const [openSideBar,setOpenSideBar] = useState(false);
	const hdrVidRef = useRef();
	const dshbrdVidRef = useRef();
    useEffect(() => {
        setTimeout(()=>{
            hdrVidRef.current.play();
            dshbrdVidRef.current.play();
        },5000)
    }, []);
    const scrollTo = (id) => {
    	if (id) document.getElementById(id).scrollIntoView({ behavior: "smooth" })
    };
	return (
		<>
			<props.Head>
				<title>Home Page | Dashboard Strategy</title>
				<meta name="Home" content="Home,Dashboard Strategy" />
			</props.Head>
			<div id="home">
					{/*HEADER*/}
				<section id="header">
					<video ref={hdrVidRef} loop muted className="bg_video">
			            <source src="/assets/media/ROOM.mp4" type="video/mp4" />
			            Your browser does not support the video tag.
			       	</video>
			       	<div id="header_nav" className="desktop_d_none header_menu">
			       		<div className="d_grid" style={{ gridTemplateColumns: '90% 10% !important' }}>
			       			<div className="grid_item">
			       				<img alt="Image" src="/assets/img/home/h_logo.png"/>
			       			</div>
			       			<div className="grid_item" id="menu-bar-toggle" onClick={() => setOpenSideBar(!openSideBar)}>
			       				{
			       					openSideBar ? <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="24px" height="24px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
			       					: <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
			       				}
			       			</div>
			       		</div>
			       	</div>
					<div className={`tab_d_none header_menu ${openSideBar ? 'open' : ''}`}>
						<div className="d_grid" style={{ gridTemplateColumns: '40% 40% 14%', gridGap: '3%' }}>
							<div className="grid_item">
								<img alt="Image" src="/assets/img/home/h_logo.png"/>
							</div>
							<div className="grid_item">
								<ul>
									<li onClick={() => scrollTo('header')}><h4>HOME</h4></li>
									<li onClick={() => scrollTo('h_sec_services')}><h4>SERVICES</h4></li>
									<li onClick={() => scrollTo('h_sec_team')}><h4>OUR TEAM</h4></li>
									<li onClick={() => scrollTo('h_get_in_touch')}><h4>CONTACT US</h4></li>
								</ul>
							</div>
							<div className="grid_item"><props.Link href="login"><button className="btn btn_web">LOGIN</button></props.Link></div>
						</div>
					</div>
					<div style={{ display: 'table', width: '100%' }}>
						<div id="header_body" className="text_center">
							<h1>DASHBOARD STRATEGY</h1>
							<h3>ADVANCE STEPS TO ACHIEVE VISION</h3>
							<div id="header_buttons">
								<button onClick={() => scrollTo('h_sec_services')} className="btn btn_web">STAKEHOLDERS FRAMEWORK</button>
								<button onClick={() => scrollTo('h_sec_services')} className="btn btn_web">KPI???s</button>
								<button onClick={() => scrollTo('h_sec_services')} className="btn btn_web">DATA</button>
								<button onClick={() => scrollTo('h_sec_services')} className="btn btn_web">SWOT</button>
								<button onClick={() => scrollTo('h_sec_services')} className="btn btn_web">ORGANIZATION CHARTS</button>
							</div>
						</div>
					</div>
				</section>
					{/*DASHBOARD STRATEGY SECTION*/}
				<section id="h_sec_2">
					<video ref={dshbrdVidRef} loop muted className="bg_video">
			            <source src="/assets/media/WORLD.mp4" type="video/mp4" />
			            Your browser does not support the video tag.
			       	</video>
					<div id="h_sec_2_data">
						<div className="d_grid" style={{ gridTemplateColumns: 'auto auto' }}>
							<div className="grid_item"><button className="btn btn_web m_t_20">Questionnaire Survey</button></div>
							<div className="grid_item text_right"><img alt="Image" src="/assets/img/home/h_sec_2_barcode.png" id="bard_code_img" /></div>
						</div>
					</div>
				</section>
					{/*OUR TESTIMONIALS*/}
				<div>
					<div className="sec_testimonail_side_img" style={{ backgroundColor: '#4b4f57'}}></div>
					<section id="h_sec_about_us">
						<div id="about_details_div" style={{ padding: '6% 10% 0%' }}>
							<div className="sec_header text_center">
								<h1 className="sec_title">About Us</h1>
								<br /><p className="sec_seperator"></p>
							</div>
							<br />
							<div className="d_grid" style={{ gridTemplateColumns: '48% 48%' , gap: '4%' }}>
								<div className="grid_item">
									<img src="/assets/img/home/about_us_hdr_1.png" className="img_1"></img>
									<img src="/assets/img/home/about_us_hdr_2.png" className="img_2"></img>
									<img src="/assets/img/home/about_us_hdr_3.png" className="img_3"></img>
								</div>
								<div className="grid_item">
									<h3 style={{ lineHeight: '32px' }}>
										From startups to enterprises, having access to business 
										intelligence(BI)becomes one of the most important factors 
										when it comes to staying ahead of the competition. From 
										extracting, monitoring, analyzing, and delivering actionable data, 
										it is important to create powerful visualizations.
										If the underlying 
										information isn???t easy to access, analyze or understand, it becomes 
										redundant. <br/>
										This is where the power of dashboards comes into play. 
										Strategic dashboards provide the best way to gain insight into an 
										organization and its various departments.
									</h3>
								</div>
							</div>
							<br/><br/><br/>
						</div>
						<br/><br/>
					</section>
				</div>
					{/*TYPES OF CHART*/}
				<section id="h_sec_charts">
					<div className="sec_header text_center">
						<h1 className="sec_title">Types of Chart</h1>
						<br /><p className="sec_seperator"></p>
					</div>
					<div id="chart_types">
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/donut_chart.png" /></div></div>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Donut Pie Chart</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>2D Pie Chart</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/2d_pie_chart.png" /></div></div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/verticle.png" /></div></div>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Verticle Bar Chart</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Horizontal Bar Chart</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/horizontal.png" /></div></div>
						</div>
					</div>
				</section>
					{/*OUR SERVICES*/}
				<section id="h_sec_services">
					<div className="sec_header text_center">
						<h1 className="sec_title">Our Services</h1>
						<br /><p className="sec_seperator"></p>
					</div>
					<br />
					<div id="services_content">
						<div className="d_grid" style={{ gridTemplateColumns: '32% 32% 32%', gridGap: '4% 2%', gridRowGap: '4%' }}>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/services/service_1.png" /></div>
									<h2 className="m_t_10"><b>STRATEGY HOUSE</b></h2><br />
									<h5>Design your strategy house.</h5><br />
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/services/service_2.png" /></div>
									<h2 className="m_t_10"><b>ORGANIZATION CHARTS</b></h2><br />
									<h5>Convert your data to visible charts</h5><br />
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/services/service_3.png" /></div>
									<h2 className="m_t_10"><b>SWOT & TOWS</b></h2><br />
									<h5>Update your project milestone</h5><br />
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/services/service_4.png" /></div>
									<h2 className="m_t_10"><b>PROJECTS ROADMAP</b></h2><br />
									<h5>We will provide you with right tools for future</h5><br />
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/services/service_5.png" /></div>
									<h2 className="m_t_10"><b>FUTURE FORSEIGHT</b></h2><br />
									<h5>Work Force Planning</h5><br />
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/services/service_6.png" /></div>
									<h2 className="m_t_10"><b>KPIs</b></h2><br />
									<h5>We will help you to use best performance indicators</h5><br />
								</div>
							</div>
						</div>
					</div>
					<br /><br />
				</section>
					{/*OUR TEAM*/}
				<section id="h_sec_team">
					<div className="sec_header text_center">
						<h1 className="sec_title">Our Team</h1>
						<br /><p className="sec_seperator"></p>
					</div>
					<br />
					<div id="team_content">
						<div className="d_grid" style={{ gridTemplateColumns: '33.33% 33.33% 33.33%' }}>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/user_defualt_img.png" /></div>
									<h2 className="m_t_10"><b>Lorem Ipsum</b></h2>
									<h4 className="m_t_10">Executive Director</h4>
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/user_defualt_img.png" /></div>
									<h2 className="m_t_10"><b>Lorem Ipsum</b></h2>
									<h4 className="m_t_10">C.E.O</h4>
								</div>
							</div>
							<div className="grid_item">
								<div className="card text_center">
									<div className="card_img"><img alt="Image" src="/assets/img/home/user_defualt_img.png" /></div>
									<h2 className="m_t_10"><b>Lorem Ipsum</b></h2>
									<h4 className="m_t_10">Chief Operating Officer</h4>
								</div>
							</div>
						</div>
					</div>
				</section>
					{/*OUR TESTIMONIALS*/}
				<div>
					<div className="sec_testimonail_side_img"></div>
					<section id="h_sec_testimonials">
						<div className="sec_header text_center">
							<h1 className="sec_title">Testimonial</h1>
							<br /><p className="sec_seperator"></p>
						</div>
						<br />
						<div id="team_content">
							<div className="d_grid" style={{ gridTemplateColumns: '33.33% 33.33% 33.33%' }}>
								<div className="grid_item">
									<div className="card text_center">
										<div className="card_img"><img alt="Image" src="/assets/img/testimonial_one.png" /></div>
										<h2 className="m_t_10"><b>Lorem Ipsum</b></h2>
										<p>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ip</p>
									</div>
								</div>
								<div className="grid_item">
									<div className="card text_center">
										<div className="card_img"><img alt="Image" src="/assets/img/testimonial_two.png" /></div>
										<h2 className="m_t_10"><b>Lorem Ipsum</b></h2>
										<p>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ip</p>
									</div>
								</div>
								<div className="grid_item">
									<div className="card text_center">
										<div className="card_img"><img alt="Image" src="/assets/img/testimonial_one.png" /></div>
										<h2 className="m_t_10"><b>Lorem Ipsum</b></h2>
										<p>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ip</p>
									</div>
								</div>
							</div>
						</div>
						<div id="testimonial_counter">
							<div className="d_grid" style={{ gridTemplateColumns: '25% 25% 25% 25%' }}>
								<div className="grid_item">
									<div className="card text_center">
										<h2><strong>60+</strong></h2>
										<p>Happy Clients</p>
									</div>	
								</div>
								<div className="grid_item">
									<div className="card text_center">
										<h2><strong>120+</strong></h2>
										<p>Project Completed </p>
									</div>	
								</div>
								<div className="grid_item">
									<div className="card text_center">
										<h2><strong>55+</strong></h2>
										<p>Win Awards</p>
									</div>	
								</div>
								<div className="grid_item">
									<div className="card text_center">
										<h2><strong>80+</strong></h2>
										<p>Team Member</p>
									</div>	
								</div>	
							</div>
						</div>
					</section>
					{/*GET IN TOUCH SECTION*/}
					<section id="h_get_in_touch"> 
						<div className="sec_header ">
							<div id="team_content">
								<div className="d_grid gird_form" style={{ gridTemplateColumns: '50% 50%' }}>
									<div className="grid_item">
										<div className="card">
											<div className="query_content">
												<p className="query_text">Have any query?</p>
												<h3>Get in touch</h3>
												<p>Thank you for your interest in our services.</p>
												<p>Whether you have questions about use cases, 
													technologies, features, demos or trials, we are here to
													help you meet your business needs.</p>
											</div>
										</div>
									</div>
									<div className="grid_item">
										<div className="card">
											<div className="query_form">
												<div className="input_field d_grid"><label>Name*</label><input type="text" name="name" /></div>
												<div className="input_field d_grid"><label>Email Address*</label><input type="email" name="name" /></div>
												<div className="input_field d_grid"><label>Mobile Number*</label><input type="number" name="name" /></div>
												<div className="input_field d_grid"><label>Subject*</label><input type="text" name="name" /></div>
												<div className="input_field d_grid"><label>Enter your message*</label><textarea type="text" name="name" /></div>
												<div className="btn_submit"><button className="btn btn_web m_t_20">Submit</button></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
					{/*FOOTER*/}
				<section id="footer">
					<div className="d_grid" style={{ gridTemplateColumns: '25% 23% 23% 20%' , gridGap: '3%' }}>
						<div className="grid_item">
							<img alt="Image" src="/assets/img/home/h_logo.png" /><br/><br/>
							<h4>
								Lorem ipsum loren ipsum loren ipsum loren
								ipsum loren ipsum loren ipsum loren ipsum
								loren ipsum loren ipsum.
							</h4>
						</div>
						<div className="grid_item">
							<h4><b>QUICK LINKS</b></h4><br/>
							<ul>
								<li className="m_b_8">Stakeholders Frame Work</li>
								<li className="m_b_8">KPI???s</li>
								<li className="m_b_8">Data</li>
								<li className="m_b_8">SWOT</li>
								<li className="m_b_8">Organization Charts</li>
							</ul>
						</div>
						<div className="grid_item">
							<h4><b>CONTACT US</b></h4><br/>
							<ul id="f_ul_with_i">
								<li className="m_b_8"><img src="/assets/img/home/locate_i.png" alt="icon"/> &nbsp; <p>Lorem ipsum, loren ipsum loren ipsum.</p></li>
								<li className="m_b_8"><img src="/assets/img/home/phone_i.png" alt="icon"/> &nbsp; <p>+92-42-3578-2222</p></li>
								<li className="m_b_8"><img src="/assets/img/home/email_i.png" alt="icon"/> &nbsp; <p>Loremipsum@gmail.com</p></li>
							</ul>
						</div>
						<div className="grid_item" id="vip_request_div">
							<div>
								<button className="btn btn_web">VIP Request</button>
							</div>
						</div>
					</div>
					<div id="footer_footer" className="text_center">
						<h3>@ Copyright 2022 <span style={{ color: 'white' }}>DashboardStrategy.com</span> All Rights Reserved</h3>
					</div>
				</section>
			</div>
		</>
	)
}
