
export default function Part ({nextComp}) {
	return (
		<>
			<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			<div id="startup_pg" style={startup_pg_stl}>
				<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>Contact Us</h2><br/><br/>
				<div id="contact_box">
					<div className="d_grid" style={{ gridTemplateColumns: '48% 48%',gridGap: '2%' }}>
						<div className="grid_item left">
							<ul>
								<li><h5><span className="text_blue">Name:</span> RASHED ALHOSANI</h5></li>
								<li><h5><span className="text_blue">Address:</span> U.A.E - ABUDHABI</h5></li>
								<li><h5><span className="text_blue">Email:</span> GATOS.AE@YAHOO.COM</h5></li>
								<li><h5><span className="text_blue">Phone:</span> +971504144142</h5></li>
							</ul>
						</div>
						<div className="grid_item right text_center">
							<img src="/assets/img/logo.png" alt="logo"/><br/><br/>
							<img src="/assets/img/presentation//phone_img.png" alt="logo"/>
						</div>
					</div>
				</div>
				<br/>
				<div className="text_center">
					<button className="actions_btns" style={go_back_btn}><img src="/assets/img/presentation/i_cash.png" alt="icon" style={i_style} /> Cash on delivery</button> &nbsp;&nbsp;&nbsp;
					<button className="actions_btns" style={start_btn}><img src="/assets/img/presentation/i_phone.png" alt="icon" style={i_style} /> VIP Request</button> &nbsp;&nbsp;&nbsp;
					<button className="actions_btns" style={go_back_btn}><img src="/assets/img/presentation/i_bank.png" alt="icon" style={i_style} /> Bank Transfer</button>
				</div>
			</div>
		</>
	)
};

const startup_pg_stl = {
	height: '100vh',
	width: '100%',
	background: 'url(/assets/img/presentation/pre_slide_bg.png)',
	backgroundColor: '#303030',
	padding: '5%',
	padding: '5%',
	backgroundAttachment: 'fixed',
};
const logo_stl = {
	position: 'absolute',
    width: '120px',
    height: 'auto',
    left: '72px',
    top: '62px',
};
const start_btn = {
	background: 'linear-gradient(180deg, #29ABE2 0%, rgba(17, 127, 169, 0.81) 100%)',
    boxShadow: '0px 0px 30px rgb(0 0 0 / 20%)',
    borderRadius: '10px',
    border: 'none',
    padding: '15px 30px',
    margin: '20px 0px',
    color: 'white',
    fontSize: '20px',
};
const go_back_btn = {
	backgroundColor: '#484342',
    borderRadius: '10px',
    border: 'none',
    padding: '15px 30px',
    margin: '20px 0px',
    color: 'white',
    fontSize: '20px',
};
const i_style = {
	width: '16px',
	height: '16px',
};