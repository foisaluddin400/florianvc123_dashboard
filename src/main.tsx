import { Loader } from 'lucide-react'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import './index.css'
import store from './redux/store'
import router from './routers/BrowserRouter'
import { SocketProvider } from './context/SocketProvider'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
        <Suspense fallback={<div className="flex items-center justify-center h-screen text-brand"><Loader className="animate-spin" size={24} /> Creating environment for you ...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </SocketProvider>
    </Provider>
  </StrictMode>,
)
