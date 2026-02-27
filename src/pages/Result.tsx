import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Copy, ExternalLink, Play, Sparkles, Check } from 'lucide-react'
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
      title: 'Copiado com sucesso!',
      description: 'O JSON foi copiado para a área de transferência.',
      className: 'bg-success text-success-foreground border-none',
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
    // Attempt to open CapCut deep link
    window.location.href = 'capcut://'
    setTimeout(() => {
      toast({
        title: 'Tentando abrir CapCut',
        description: 'Se o app não abrir, verifique se ele está instalado.',
      })
    }, 500)
  }

  return (
    <div className="animate-slide-in-right px-4 py-6 flex flex-col gap-6">
      <div className="text-center space-y-1 mt-2">
        <div className="inline-flex items-center justify-center p-2 bg-success/20 rounded-full mb-2 text-success-foreground">
          <Sparkles className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Prompt Pronto!</h2>
        <p className="text-muted-foreground text-sm">
          Seu JSON estruturado foi gerado com sucesso.
        </p>
      </div>

      <Card className="overflow-hidden border-border shadow-md bg-[#1E1E1E]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40">
          <span className="text-xs font-mono text-white/50">prompt.json</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-white/70 hover:text-white hover:bg-white/10 h-8 gap-1.5 px-2 -mr-2"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-success" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="text-xs">{copied ? 'Copiado' : 'Copiar'}</span>
          </Button>
        </div>

        <div className="p-4 overflow-x-auto">
          {isGenerating ? (
            <div className="animate-pulse-subtle space-y-2 py-4">
              <div className="h-4 bg-white/10 rounded w-1/4"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
              <div className="h-4 bg-white/10 rounded w-1/3"></div>
            </div>
          ) : (
            <pre className="font-mono text-sm leading-relaxed text-[#D4D4D4]">
              <span className="text-[#9CDCFE]">{'{'}</span>
              <br />
              <span className="text-[#9CDCFE]"> "nicho"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.nicho}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "opcao"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.opcao}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "personagem"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.personagem}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "estilo"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.estilo}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "iluminacao"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.iluminacao}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "data"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.data}"</span>
              <br />
              <span className="text-[#9CDCFE]">{'}'}</span>
            </pre>
          )}
        </div>
      </Card>

      <div className="space-y-4 pt-2">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground px-1">
          Exportar & Criar
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="col-span-2 h-12 rounded-xl border-primary text-primary hover:bg-primary/5 font-semibold"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copiar JSON
          </Button>

          <Button
            onClick={handleWhisk}
            className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Whisk
          </Button>

          <Button
            onClick={handleFlow}
            className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Flow
          </Button>

          <Button
            onClick={handleCapCut}
            className="col-span-2 h-14 rounded-xl bg-[#000000] hover:bg-[#222222] text-white font-bold text-base shadow-lg active:scale-[0.98] transition-all"
          >
            <Play className="mr-2 h-5 w-5 fill-white" />
            Abrir no CapCut
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Result
