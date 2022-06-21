import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import {useRef} from 'react'

export default function Page () {
	const pdfExportComponent = useRef();
	const  handleExportWithComponent  = (event) => {
	    pdfExportComponent.current.save();
	}
	// const  handleExportWithFunction  = (event) => {
	//   savePDF(contentArea.current, { paperSize:  "A4" });
	// }
	return (
		<PDFExport  ref={pdfExportComponent}  paperSize="A4">
			<div  className="app-content">
			  	<div>
			    	<h1>KendoReact PDF Processing</h1>
			    	<img  src="https://i.stack.imgur.com/z4GoU.png"  alt="Kendo UI Kendoka"  />
			    	<p>This is an example of text that may be <span  className="neat-style">styled</span></p>
			  	</div>
			</div>
			<button onClick={handleExportWithComponent}>Export with Component</button>
		</PDFExport>
	)
};