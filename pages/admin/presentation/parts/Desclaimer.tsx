
export default function Part ({nextComp}) {
	return (
		<>
			<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			<div id="startup_pg" style={startup_pg_stl}>
				<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>Disclaimer</h2><br/><br/>
				<div className="card" style={card_stl}>
					<h3 className="text_blue" style={{ marginBottom: '20px' }}>Disclaimer (English)</h3>
					<p>
						The contents of this presentation and its attachment are confidential and intend solely for the sender and the addressee if you are not the intended recipient , it is 
						prohibited to use or share the information in any way . If you have received this email by mistake , please notify the sender immediately and delete it from your system . 
						Electronic correspondence cannot be guaranteed to be secured of error-free .
					</p>
				</div>
				<div className="card" style={card_stl}>
					<h3 className="text_blue" style={{ marginBottom: '20px' }}>Disclaimer (Arabic)</h3>
					<p>
						The contents of this presentation and its attachment are confidential and intend solely for the sender and the addressee if you are not the intended recipient , it is 
						prohibited to use or share the information in any way . If you have received this email by mistake , please notify the sender immediately and delete it from your system . 
						Electronic correspondence cannot be guaranteed to be secured of error-free .
					</p>
				</div>
				<div className="text_center">
					<button className="actions_btns" onClick={() => nextComp('TabCard3')} style={start_btn}>Back</button> &nbsp;&nbsp;&nbsp;
					<button className="actions_btns" onClick={() => nextComp('ContactUs')} style={start_btn}>Next</button>
				</div>
			</div>
		</>
	)
};

const startup_pg_stl = {
	height: '100vh',
	width: '100%',
	background: 'url(/assets/img/presentation/project_bg.png)',
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
const card_stl = {
	background: 'linear-gradient(180deg, rgb(196 196 196 / 18%) 0%, rgb(196 196 196 / 9%) 100%)',
    borderRadius: '45px',
    padding: '40px',
    margin: '0px 0px 25px',
    color: 'white',
};