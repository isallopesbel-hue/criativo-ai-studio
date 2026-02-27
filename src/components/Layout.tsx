import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-100/50 flex justify-center w-full font-sans">
      {/* Mobile App Container Wrapper */}
      <main className="w-full max-w-[480px] bg-background min-h-screen shadow-2xl relative flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-navy/5 px-4 h-16 flex items-center shrink-0">
          <div className="flex items-center w-full">
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2 -ml-2 text-navy hover:bg-navy/10 hover:text-navy active:scale-95 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}

            <div
              className={`flex items-center gap-2 ${isHome ? 'mx-auto' : ''}`}
            >
              <div className="bg-navy p-1.5 rounded-lg text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <h1 className="text-base font-bold text-navy tracking-tight uppercase">
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
