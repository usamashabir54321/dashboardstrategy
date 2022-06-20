
export default function Part ({nextComp}) {
	return (
		<>
			<div id="startup_pg" style={startup_pg_stl}>
				<button id="start_btn" onClick={() => nextComp('TabCard1')} style={start_btn}>Next</button>
				<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			</div>
		</>
	)
};

const startup_pg_stl = {
	height: '100vh',
	width: '100%',
	background: 'url("/assets/img/presentation/intro_bg.png") rgb(48, 48, 48) center center no-repeat',
	backgroundSize: 'cover',
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
	background: 'linear-gradient(rgb(41, 171, 226) 0%, rgba(17, 127, 169, 0.81) 100%)',
    boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 30px',
    borderRadius: '10px',
    border: 'none',
    padding: '15px 30px',
    color: 'white',
    fontSize: '20px',
    width: '275px',
    position: 'absolute',
    bottom: '10%',
};