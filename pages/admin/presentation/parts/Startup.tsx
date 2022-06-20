import { useRouter } from 'next/router';

export default function Part ({nextComp}) {
	const router = useRouter();
	return (
		<>
			<div id="startup_pg" style={startup_pg_stl}>
				<div id="buttons_div" style={{ margin: 'auto' }}>
					<button id="start_btn" onClick={() => nextComp('StartPresentation')} style={start_btn}>Presentation Mode</button>
					<button id="go_back_btn" onClick={() => router.push('/admin/view-project')} style={go_back_btn}>Go Back</button>
				</div>
				<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			</div>
		</>
	)
};

const startup_pg_stl = {
	height: '100vh',
	width: '100%',
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
const go_back_btn = {
	backgroundColor: '#484342',
    borderRadius: '10px',
    border: 'none',
    padding: '15px 30px',
    display: 'block',
    margin: '20px 0px',
    color: 'white',
    fontSize: '20px',
    width: '275px',
};