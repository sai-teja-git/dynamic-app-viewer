import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App.tsx'
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import "./Main.scss"
import { ProgressSpinner } from 'primereact/progressspinner'

const progress = () => {
  return <div className="h-screen w-full flex align-items-center justify-content-center">
    <ProgressSpinner />
  </div>
}

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={progress()}>
    <Toaster position='top-center' duration={1000} />
    <App />
  </Suspense>
)
