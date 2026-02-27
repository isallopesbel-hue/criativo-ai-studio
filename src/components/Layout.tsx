import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-[#050A0F] flex justify-center w-full font-sans text-white">
      {/* Mobile & Desktop App Container Wrapper */}
      <main className="w-full max-w-6xl bg-[#050A0F] min-h-screen relative flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#050A0F]/90 backdrop-blur-md border-b border-white/10 px-4 h-16 flex items-center shrink-0">
          <div className="flex items-center w-full">
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2 -ml-2 text-white hover:bg-white/10 hover:text-yellow-400 active:scale-95 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}

            <div
              className={`flex items-center gap-2 ${isHome ? 'mx-auto' : ''}`}
            >
              <div className="bg-yellow-400 p-1.5 rounded-lg text-black">
                <Sparkles className="h-4 w-4" />
              </div>
              <h1 className="text-base font-bold text-white tracking-tight uppercase">
                Criativo AI Studio
              </h1>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
