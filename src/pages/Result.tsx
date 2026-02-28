import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Copy, ExternalLink, Play, Check, Code2, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const Result = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const result = location.state?.result
  const isNew = location.state?.isNew || false

  const [isGenerating, setIsGenerating] = useState(isNew)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!result) {
      navigate('/')
      return
    }

    if (isNew) {
      const timer = setTimeout(() => {
        setIsGenerating(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [result, isNew, navigate])

  if (!result) return null

  const jsonString = JSON.stringify(result.json, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    toast({
      title: 'Comando Copiado!',
      description: 'O JSON foi copiado para sua área de transferência.',
      className: 'bg-emerald-600 text-white border-none font-medium',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhisk = () => {
    window.open(
      `https://labs.google/whisk?prompt=${encodeURIComponent(jsonString)}`,
      '_blank',
    )
  }

  const handleFlow = () => {
    window.open(
      `https://labs.google/flow?prompt=${encodeURIComponent(jsonString)}`,
      '_blank',
    )
  }

  const handleCapCut = () => {
    window.location.href = 'capcut://'
    setTimeout(() => {
      toast({
        title: 'Iniciando CapCut...',
        description:
          'Certifique-se de ter o aplicativo instalado no dispositivo.',
        className: 'bg-card text-foreground border-border',
      })
    }, 500)
  }

  const renderHighlightedJSON = (jsonStr: string) => {
    return jsonStr.split('\n').map((line, i) => {
      // Basic formatting for standard JSON stringification
      if (line.includes('": "')) {
        const [keyPart, valPart] = line.split('": "')
        return (
          <div key={i}>
            <span className="text-cyan-400">{keyPart}"</span>
            <span className="text-slate-500">: </span>
            <span className="text-primary">"{valPart}</span>
          </div>
        )
      } else if (line.includes('": ')) {
        const [keyPart, valPart] = line.split('": ')
        const isNumberOrBool =
          !valPart.startsWith('"') &&
          !valPart.startsWith('{') &&
          !valPart.startsWith('[')
        return (
          <div key={i}>
            <span className="text-cyan-400">{keyPart}"</span>
            <span className="text-slate-500">: </span>
            <span
              className={isNumberOrBool ? 'text-emerald-400' : 'text-slate-300'}
            >
              {valPart}
            </span>
          </div>
        )
      }
      return (
        <div key={i} className="text-cyan-400">
          {line}
        </div>
      )
    })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col gap-8 min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="text-center space-y-4 mt-4">
        <div className="inline-flex items-center justify-center p-5 bg-primary/10 rounded-2xl mb-2 border border-primary/20 shadow-[0_0_40px_-10px_rgba(251,191,36,0.25)]">
          <Terminal className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Prompt Compilado
        </h2>
        <p className="text-muted-foreground text-sm md:text-base font-medium max-w-lg mx-auto">
          O seu comando em formato JSON está estruturado e pronto para
          exportação para sua ferramenta de IA.
        </p>
      </div>

      <Card className="overflow-hidden border border-border shadow-2xl bg-card rounded-2xl relative">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background/50">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">
              prompt.json
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-primary hover:text-primary hover:bg-primary/10 h-9 gap-2 px-4 rounded-lg border border-primary/20 transition-all active:scale-95"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="text-xs font-bold">
              {copied ? 'COPIADO' : 'COPIAR JSON'}
            </span>
          </Button>
        </div>

        <div className="p-6 md:p-8 overflow-x-auto hide-scrollbar bg-[#020617]">
          {isGenerating ? (
            <div className="animate-pulse space-y-5 py-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-primary/40 animate-ping" />
                <span className="text-primary/60 font-mono text-sm">
                  Compilando estrutura...
                </span>
              </div>
              <div className="h-4 bg-secondary/50 rounded w-1/4"></div>
              <div className="h-4 bg-secondary/50 rounded w-3/4"></div>
              <div className="h-4 bg-secondary/50 rounded w-1/2"></div>
              <div className="h-4 bg-secondary/50 rounded w-2/3"></div>
            </div>
          ) : (
            <pre className="font-mono text-sm md:text-base leading-relaxed text-slate-300">
              {renderHighlightedJSON(jsonString)}
            </pre>
          )}
        </div>
      </Card>

      <div className="space-y-6 pb-12">
        <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-3">
          <span className="w-16 h-px bg-border"></span>
          Exportar & Executar
          <span className="w-16 h-px bg-border"></span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-14 rounded-xl border-border hover:border-primary/50 text-foreground hover:bg-secondary font-bold text-sm bg-card transition-all shadow-sm"
          >
            <Copy className="mr-2 h-4 w-4 text-primary" />
            COPIAR JSON
          </Button>

          <Button
            onClick={handleWhisk}
            className="h-14 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            ABRIR WHISK
          </Button>

          <Button
            onClick={handleFlow}
            className="h-14 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(8,145,178,0.39)] transition-all"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            ABRIR FLOW
          </Button>

          <Button
            onClick={handleCapCut}
            className="h-14 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-bold text-sm shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] transition-all"
          >
            <Play className="mr-2 h-4 w-4 fill-slate-900" />
            CAPCUT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Result
