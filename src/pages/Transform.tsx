import { useState, useRef } from 'react'
import { PromptCompiler } from '@/lib/PromptCompiler'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Copy,
  Check,
  Sparkles,
  Upload,
  Wand2,
  User,
  Image as ImageIcon,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Transform = () => {
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [userImage, setUserImage] = useState<string | null>(null)
  const [sceneIdea, setSceneIdea] = useState<string>('')
  const [generatedJson, setGeneratedJson] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const referenceInputRef = useRef<HTMLInputElement>(null)
  const userInputRef = useRef<HTMLInputElement>(null)

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReferenceImage(URL.createObjectURL(file))
    }
  }

  const handleUserUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUserImage(URL.createObjectURL(file))
    }
  }

  const handleGenerate = () => {
    if (!referenceImage || !userImage) {
      toast({
        title: 'Imagens Ausentes',
        description:
          'Por favor, envie tanto a imagem de referência quanto a sua foto.',
        variant: 'destructive',
      })
      return
    }

    const jsonPayload = PromptCompiler.compileTransform({
      sceneIdea,
      hasReference: !!referenceImage,
      hasUserImage: !!userImage,
    })

    setGeneratedJson(JSON.stringify(jsonPayload, null, 2))
  }

  const handleCopy = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(generatedJson)
      setCopied(true)
      toast({
        title: 'Copiado!',
        description: 'O JSON foi copiado para sua área de transferência.',
        className: 'bg-emerald-600 text-white border-none font-medium',
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const renderHighlightedJSON = (jsonStr: string) => {
    return jsonStr.split('\n').map((line, i) => {
      if (line.includes('": "')) {
        const [keyPart, valPart] = line.split('": "')
        return (
          <div key={i}>
            <span className="text-cyan-400">{keyPart}"</span>
            <span className="text-slate-500">: </span>
            <span className="text-emerald-400">"{valPart}</span>
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
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-[#FFC107]/10 rounded-2xl mb-2 border border-[#FFC107]/20 shadow-[0_0_30px_-5px_rgba(255,193,7,0.25)]">
          <Wand2 className="h-8 w-8 text-[#FFC107]" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Transformação Cinematográfica
        </h2>
        <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl mx-auto">
          Faça upload de um personagem de referência e sua foto para gerar um
          prompt IA 8K profissional.
        </p>
      </div>

      <Card className="p-6 md:p-8 border-border bg-card shadow-lg rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#FFC107]" />
              1. Imagem de Referência
            </Label>
            <div
              onClick={() => referenceInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-[#FFC107]/50 bg-background/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[200px]"
            >
              <input
                type="file"
                ref={referenceInputRef}
                onChange={handleReferenceUpload}
                accept="image/*"
                className="hidden"
              />
              {referenceImage ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <img
                    src={referenceImage}
                    alt="Reference Preview"
                    className="max-h-40 object-contain rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Upload className="w-5 h-5" /> Trocar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-[#FFC107] transition-colors">
                  <div className="p-4 bg-secondary rounded-full border border-border group-hover:border-[#FFC107]/30 shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm">Enviar Referência</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <User className="w-4 h-4 text-[#FFC107]" />
              2. Sua Foto
            </Label>
            <div
              onClick={() => userInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-[#FFC107]/50 bg-background/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[200px]"
            >
              <input
                type="file"
                ref={userInputRef}
                onChange={handleUserUpload}
                accept="image/*"
                className="hidden"
              />
              {userImage ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <img
                    src={userImage}
                    alt="User Preview"
                    className="max-h-40 object-contain rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Upload className="w-5 h-5" /> Trocar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-[#FFC107] transition-colors">
                  <div className="p-4 bg-secondary rounded-full border border-border group-hover:border-[#FFC107]/30 shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm">Enviar Foto</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <Label
            htmlFor="sceneIdea"
            className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
            3. Ideia da Cena (Opcional)
          </Label>
          <Textarea
            id="sceneIdea"
            placeholder="Ex: Um cavaleiro jedi em um campo de batalha galáctico noturno..."
            value={sceneIdea}
            onChange={(e) => setSceneIdea(e.target.value)}
            className="min-h-[100px] text-base bg-background focus-visible:ring-[#FFC107] focus-visible:border-[#FFC107]"
          />
        </div>

        <Button
          onClick={handleGenerate}
          className="w-full h-14 rounded-xl bg-[#FFC107] hover:bg-[#FFC107]/90 text-black font-extrabold text-base tracking-wide shadow-lg transition-all active:scale-[0.98]"
        >
          <Sparkles className="mr-2 h-5 w-5 text-black" />
          GERAR PROMPT
        </Button>
      </Card>

      {generatedJson && (
        <Card className="overflow-hidden border border-border shadow-xl bg-[#020617] rounded-xl relative animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFC107]/50 to-transparent" />

          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-background/20">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFC107]">
                transformation.json
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-[#FFC107] hover:text-[#FFC107] hover:bg-[#FFC107]/10 h-9 gap-2 px-4 rounded-lg border border-[#FFC107]/20 transition-all"
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

          <div className="p-5 md:p-8 overflow-x-auto bg-[#020617] hide-scrollbar">
            <pre className="font-mono text-sm leading-relaxed text-slate-300">
              {renderHighlightedJSON(generatedJson)}
            </pre>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Transform
