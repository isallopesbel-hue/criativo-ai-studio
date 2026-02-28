import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { ChevronLeft, Terminal, Camera, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-[#0B0E14] flex justify-center w-full font-sans text-foreground">
      {/* Mobile & Desktop App Container Wrapper */}
      <main className="w-full max-w-6xl bg-[#0B0E14] min-h-screen relative flex flex-col overflow-hidden shadow-2xl">
        {/* Header - Fixed navigation bar */}
        <header className="sticky top-0 z-50 bg-[#0B0E14]/95 backdrop-blur-md border-b border-border/40 px-4 h-16 flex items-center shrink-0 transition-all justify-between">
          <div className="flex items-center flex-1">
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2 -ml-2 text-muted-foreground hover:bg-secondary hover:text-[#FFC107] active:scale-95 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}

            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-[#FFC107] w-8 h-8 rounded-[10px] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(255,193,7,0.4)]">
                <Terminal strokeWidth={2.5} className="h-4 w-4 text-black" />
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-widest uppercase mt-0.5">
                PROMPT MASTER
              </h1>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Link to="/transform">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#FFC107] hover:text-[#FFC107] hover:bg-[#FFC107]/10 border border-transparent hover:border-[#FFC107]/20 transition-all px-2 sm:px-3"
              >
                <Wand2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline font-bold tracking-wide">
                  Transform
                </span>
              </Button>
            </Link>
            <Link to="/ensaio">
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all px-2 sm:px-3"
              >
                <Camera className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline font-bold tracking-wide">
                  Ensaio
                </span>
              </Button>
            </Link>
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
