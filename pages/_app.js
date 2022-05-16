import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import axios from 'axios'

axios.defaults.baseURL = 'https://backend.dashboardstrategy.com/';

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