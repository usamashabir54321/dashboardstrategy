
export default function Part ({nextComp}) {
	return (
		<>
			<div id="startup_pg" style={startup_pg_stl}>
				<div id="buttons_div" style={{ margin: 'auto' }}>
					<div id="box_div" style={box_div}>
						<div style={box_inner_div}><img src="/assets/img/logo.png" alt="logo"/></div>
					</div>
					<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>Presentation Slides</h2><br/><br/>
					<button id="start_btn" onClick={() => nextComp('DbsIntro')} style={start_btn}>Start Presentation</button>
				</div>
				<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			</div>
		</>
	)
};

const startup_pg_stl = {
	height: '100vh',
	width: '100%',
	background: 'url(/assets/img/presentation/pre_slide_bg.png)',
	backgroundColor: '#303030',
	display: 'flex',
	justifyContent: 'center',
};
const logo_stl = {
	position: 'absolute',
    left: '6.33%',
    right: '87.35%',
    top: '80.12%',
    bottom: '5.57%',
};
const start_btn = {
	background: 'linear-gradient(180deg, #29ABE2 0%, rgba(17, 127, 169, 0.81) 100%)',
    boxShadow: '0px 0px 30px rgb(0 0 0 / 20%)',
    borderRadius: '10px',
    border: 'none',
    padding: '15px 30px',
    display: 'block',
    margin: '20px 0px',
    color: 'white',
    fontSize: '20px',
    width: '275px',
};
const box_div = {
	textAlign: 'center',
    height: '250px',
    width: '250px',
    display: 'table',
    border: '2px solid white',
    borderRadius: '50%',
    marginBottom: '15px',
    padding: '8px',
};
const box_inner_div = {
	display: 'table-cell',
	verticalAlign: 'middle',
	background: 'rgba(191, 191, 191, 0.4)',
    boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)',
    borderRadius: '50%',
};