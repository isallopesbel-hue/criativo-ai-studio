import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background flex justify-center w-full font-sans text-foreground">
      {/* Mobile & Desktop App Container Wrapper */}
      <main className="w-full max-w-6xl bg-background min-h-screen relative flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 px-4 h-16 flex items-center shrink-0 transition-all">
          <div className="flex items-center w-full">
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2 -ml-2 text-muted-foreground hover:bg-secondary hover:text-primary active:scale-95 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}

            <div
              className={`flex items-center gap-3 ${isHome ? 'mx-auto' : ''}`}
            >
              <div className="bg-primary w-8 h-8 rounded-[10px] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(255,193,7,0.4)]">
                <Terminal
                  strokeWidth={2.5}
                  className="h-4 w-4 text-primary-foreground"
                />
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-widest uppercase mt-0.5">
                PROMPT MASTER
              </h1>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
