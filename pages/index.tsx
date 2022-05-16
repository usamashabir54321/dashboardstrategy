import Head from 'next/head'
import Link from 'next/link'

export default function Page () {
	return (
		<>
			<Head>
				<title>Home Page | Dashboard Strategy</title>
				<meta name="Home" content="Home,Dashboard Strategy" />
			</Head>
			<div id="home">
					{/*DASHBOARD STRATEGY SECTION*/}
				<section id="h_sec_2">
					<div id="h_sec_2_data">
						<div className="d_grid" style={{ gridTemplateColumns: 'auto auto' }}>
							<div className="grid_item"><button className="btn btn_web m_t_20">Questionnaire Survey</button></div>
							<div className="grid_item text_right"><img alt="Image" src="/assets/img/home/h_sec_2_barcode.png" id="bard_code_img" /></div>
						</div>
					</div>
				</section>
					{/*TYPES OF CHART*/}
				<section id="h_sec_charts">
					<div className="sec_header text_center">
						<h1 className="sec_title">Types of Chart</h1>
						<br /><p className="sec_seperator"></p>
					</div>
					<div id="chart_types">
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_1.png" /></div></div>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 1</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 2</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_2.png" /></div></div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_3.png" /></div></div>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 3</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 4</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_4.png" /></div></div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_5.png" /></div></div>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 5</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 6</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
							<div className="grid_item text_center"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_6.png" /></div></div>
						</div>
						<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' , gridGap: '30px' }}>
							<div className="grid_item"><div className="chart_img_wrap"><img alt="Image" src="/assets/img/home/charts/chart_7.png" /></div></div>
							<div className="grid_item chart_txt_grid">
								<div className="chart_txt_wrap">
									<h2><b>Chart 7</b></h2><br />
									<h4>Lorem ipsum loren ipsum loren ipsum loren lorem ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum loren ipsum. </h4>
								</div>
							</div>
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
						<div className="d_grid" style={{ gridTemplateColumns: '30.33% 30.33% 30.33%', gridGap: '4.33%', gridRowGap: '5.33%' }}>
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
					<div id="sec_testimonail_side_img"></div>
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
								<div className="d_grid" style={{ gridTemplateColumns: '50% 50%' }}>
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
												<div className="input_field d_inline"><label>Name*</label><input type="text" name="name" /></div>
												<div className="input_field d_inline"><label>Email Address*</label><input type="email" name="name" /></div>
												<div className="input_field d_inline"><label>Mobile Number*</label><input type="number" name="name" /></div>
												<div className="input_field d_inline"><label>Subject*</label><input type="text" name="name" /></div>
												<div className="input_field d_inline"><label>Enter your message*</label><textarea type="text" name="name" /></div>
												<div className="btn_submit"><button className="btn btn_web m_t_20">Submit</button></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>	
				</div>
			</div>
		</>
	)
}
