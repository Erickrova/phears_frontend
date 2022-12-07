import { AppProvider } from '../context/AppProvider'
import { AuthProvider } from '../context/AuthProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (

    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
        <script
            async
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
          ></script>
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
