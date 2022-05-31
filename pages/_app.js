import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import axios from 'axios'
import 'react-loading-skeleton/dist/skeleton.css'

axios.defaults.baseURL = 'https://backend.dashboardstrategy.com/';
// axios.defaults.baseURL = 'http://localhost:8000/';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || EmptyLayout;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

const EmptyLayout = ({children}) => <>{children}</>;

export default wrapper.withRedux(MyApp);