import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
axios.defaults.baseURL = 'https://backend.dashboardstrategy.com/';
// axios.defaults.baseURL = 'http://localhost:8000/';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || EmptyLayout;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} Link={Link} Head={Head} Swal={Swal} Toast={Toast} />
      </Layout>
    </Provider>
  )
}

const EmptyLayout = ({children}) => <>{children}</>;

export default wrapper.withRedux(MyApp);