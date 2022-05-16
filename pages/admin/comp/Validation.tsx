
export default function Comp ({alert}) {
	return (
		<>
			{ alert == 'login_succ' ? <div className="toast toast-success"><div className="toast-title">Success</div><div className="toast-message">Your credentails are matched successfully.</div></div> : '' }
			{ alert == 'register_suc' ? <div className="toast toast-success"><div className="toast-title">Success</div><div className="toast-message">Registered successfully.</div></div> : '' }
			{ alert == 'form_saved' ? <div className="toast toast-success"><div className="toast-title">Success</div><div className="toast-message">Form data saved successfully.</div></div> : '' }

			{ alert == 'login_err' ? <div className="toast toast-error"><div className="toast-title">Error</div><div className="toast-message">Your credentails are not matching.</div></div> : '' }

			{ alert == 'some_missing' ? <div className="toast toast-warning"><div className="toast-title">Warning</div><div className="toast-message">Something is missing.</div></div> : '' }
			{ alert == 'double_email' ? <div className="toast toast-warning"><div className="toast-title">Warning</div><div className="toast-message">This email is already registered.</div></div> : '' }
		</>
	)
}