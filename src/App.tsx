import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Options from './pages/Options'
import Result from './pages/Result'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { PromptProvider } from './stores/usePromptStore'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <TooltipProvider>
      <PromptProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/options/:nicheId" element={<Options />} />
            <Route path="/result" element={<Result />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PromptProvider>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
