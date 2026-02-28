import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Copy, Check, Code2, Play } from 'lucide-react'
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
      }, 800)
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col gap-6 min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mt-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Prompt Master JSON
          </h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            Pronto para exportação. Metadados em Inglês, narrativa em Português.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="font-bold border-primary/50 text-primary hover:bg-primary/10 h-11 px-5 rounded-xl bg-card"
          >
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
          <Button
            onClick={handleWhisk}
            className="font-bold bg-indigo-600 hover:bg-indigo-500 text-white h-11 rounded-xl shadow-md"
          >
            Whisk
          </Button>
          <Button
            onClick={handleFlow}
            className="font-bold bg-cyan-600 hover:bg-cyan-500 text-white h-11 rounded-xl shadow-md"
          >
            Flow
          </Button>
          <Button
            onClick={handleCapCut}
            className="font-bold bg-slate-100 hover:bg-white text-slate-900 h-11 rounded-xl shadow-md"
          >
            <Play className="mr-2 h-4 w-4 fill-slate-900" />
            CapCut
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border border-border shadow-xl bg-[#020617] rounded-xl relative flex-1">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-background/20">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">
              output.json
            </span>
          </div>
        </div>

        <div className="p-5 md:p-8 overflow-x-auto hide-scrollbar">
          {isGenerating ? (
            <div className="animate-pulse space-y-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary/50 animate-ping" />
                <span className="text-primary/70 font-mono text-sm">
                  Estruturando prompt...
                </span>
              </div>
              <div className="h-3 bg-secondary/50 rounded w-1/4"></div>
              <div className="h-3 bg-secondary/50 rounded w-3/4"></div>
              <div className="h-3 bg-secondary/50 rounded w-1/2"></div>
            </div>
          ) : (
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
              {renderHighlightedJSON(jsonString)}
            </pre>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Result
