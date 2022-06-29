import { useRouter } from 'next/router'
import { useState , useEffect } from 'react'
import { useSelector } from "react-redux";
import { getCookie } from 'cookies-next';
import Startup from './parts/Startup.tsx'
import StartPresentation from './parts/StartPresentation.tsx'
import DbsIntro from './parts/DbsIntro.tsx'
import TabCard1 from './parts/TabCard1.tsx'
import TabCard2 from './parts/TabCard2.tsx'
import TabCard3 from './parts/TabCard3.tsx'
import Desclaimer from './parts/Desclaimer.tsx'
import ContactUs from './parts/ContactUs.tsx'

export default function SubPage (props) {
	const router = useRouter();
	const [selectComp,setNowComp] = useState('Startup');
	const adminStoreData = useSelector((state) => state.adminStore);
	const { PresentProId } = adminStoreData;
	useEffect(() => {
		if (!getCookie('auth_token')) router.push('/login');
		else if (!PresentProId) router.push('/admin/view-project');
		document.body.style.backgroundColor = "#303030";
		document.getElementById('present_main_wrapper').focus();
	},[]);
	function NowComp () {
		switch(selectComp) {
			case "Startup":   return <Startup nextComp={setComp} />;
			case "StartPresentation":   return <StartPresentation nextComp={setComp} />;
			case "DbsIntro":   return <DbsIntro nextComp={setComp} />;
			case "TabCard1":   return <TabCard1 nextComp={setComp} proId={PresentProId} props={props} />;
			case "TabCard2":   return <TabCard2 nextComp={setComp} proId={PresentProId} props={props} />;
			case "TabCard3":   return <TabCard3 nextComp={setComp} proId={PresentProId} props={props} />;
			case "Desclaimer":   return <Desclaimer nextComp={setComp} />;
			case "ContactUs":   return <ContactUs nextComp={setComp} />;
			default: return '';
		}
	}
	const setComp = (payload) => {
		setNowComp(payload);
		document.getElementById('present_main_wrapper').focus();
	};
	const handleKeyDown = (event) => {
		if (event.key === 'ArrowLeft') {
			console.log('ArrowLeft');
			if (selectComp == 'Startup') router.push('/admin/view-project');
			else if (selectComp == 'StartPresentation') setNowComp('Startup');
			else if (selectComp == 'DbsIntro') setNowComp('StartPresentation');
			else if (selectComp == 'TabCard1') setNowComp('DbsIntro');
			else if (selectComp == 'TabCard2') setNowComp('TabCard1');
			else if (selectComp == 'TabCard3') setNowComp('TabCard2');
			else if (selectComp == 'Desclaimer') setNowComp('TabCard3');
			else if (selectComp == 'ContactUs') setNowComp('Desclaimer');
		} else if (event.key === 'ArrowRight') {
			console.log('ArrowRight');
			if (selectComp == 'Startup') setNowComp('StartPresentation');
			else if (selectComp == 'StartPresentation') setNowComp('DbsIntro');
			else if (selectComp == 'DbsIntro') setNowComp('TabCard1');
			else if (selectComp == 'TabCard1') setNowComp('TabCard2');
			else if (selectComp == 'TabCard2') setNowComp('TabCard3');
			else if (selectComp == 'TabCard3') setNowComp('Desclaimer');
			else if (selectComp == 'Desclaimer') setNowComp('ContactUs');
			else if (selectComp == 'ContactUs') setNowComp('ContactUs');
		}
	};
	return (
		<div tabIndex={0} onKeyDown={handleKeyDown} id="present_main_wrapper">
			<props.Head>
				<title>Admin Project Presentation | Dashboard Strategy</title>
				<meta name="Admin Project Presentation" content="Admin Project Presentation,Dashboard Strategy" />
			</props.Head>
			{NowComp()}
		</div>
	)
};