import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, Image as ImageIcon, Sparkles, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Ensaio = () => {
  const [image, setImage] = useState<string | null>(null)
  const [promptInput, setPromptInput] = useState('')
  const [generatedJson, setGeneratedJson] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  const handleGenerate = () => {
    const json = {
      subject: promptInput || 'professional photoshoot',
      style: 'professional photography',
      quality: '8K ultra realistic',
      reference_image: image ? 'user_provided' : 'none',
      language: 'en',
    }
    setGeneratedJson(JSON.stringify(json, null, 2))
  }

  const handleCopy = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(generatedJson)
      setCopied(true)
      toast({
        title: 'Copied!',
        description: 'JSON has been copied to your clipboard.',
        className: 'bg-emerald-600 text-white border-none font-medium',
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const parsedJson = generatedJson ? JSON.parse(generatedJson) : null

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col gap-8 min-h-[calc(100vh-4rem)] max-w-3xl mx-auto w-full">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-2xl mb-2 border border-accent/20 shadow-[0_0_30px_-5px_rgba(8,145,178,0.25)]">
          <ImageIcon className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Photo Shoot Tool
        </h2>
        <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl mx-auto">
          Upload reference images and generate precise prompt structures for
          professional photoshoots in JSON format.
        </p>
      </div>

      <Card className="p-6 md:p-8 border-border bg-card shadow-2xl rounded-2xl space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-bold text-foreground tracking-wide uppercase">
            1. Reference Image
          </Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-accent/50 bg-background/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            {image ? (
              <div className="relative w-full flex justify-center">
                <img
                  src={image}
                  alt="Reference Preview"
                  className="max-h-64 object-contain rounded-lg border border-border shadow-md bg-black/20"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-sm">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Change Image
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground group-hover:text-accent transition-colors">
                <div className="p-5 bg-secondary rounded-full border border-border group-hover:border-accent/30 shadow-sm">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-lg">
                    Click to upload
                  </p>
                  <p className="text-sm font-medium">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label
            htmlFor="promptIdea"
            className="text-base font-bold text-foreground tracking-wide uppercase"
          >
            2. Prompt Idea
          </Label>
          <Input
            id="promptIdea"
            placeholder="ex: beach, Paris, studio..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="h-14 text-base focus-visible:ring-accent focus-visible:border-accent"
          />
        </div>

        <Button
          onClick={handleGenerate}
          className="w-full h-14 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold text-base tracking-wide shadow-[0_0_25px_-5px_rgba(8,145,178,0.4)] transition-all active:scale-[0.98]"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          GENERATE PROMPT
        </Button>
      </Card>

      {parsedJson && (
        <Card className="overflow-hidden border border-border shadow-2xl bg-card rounded-2xl relative animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background/50">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-accent">
                output.json
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-accent hover:text-accent hover:bg-accent/10 h-9 gap-2 px-4 rounded-lg border border-accent/20 transition-all active:scale-95"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="text-xs font-bold">
                {copied ? 'COPIED' : 'COPY JSON'}
              </span>
            </Button>
          </div>

          <div className="p-6 md:p-8 overflow-x-auto bg-[#020617] hide-scrollbar">
            <pre className="font-mono text-sm md:text-base leading-relaxed text-slate-300">
              <span className="text-cyan-400">{'{'}</span>
              <br />
              <span className="text-cyan-400"> "subject"</span>
              <span className="text-slate-500">: </span>
              <span className="text-primary">"{parsedJson.subject}"</span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "style"</span>
              <span className="text-slate-500">: </span>
              <span className="text-primary">"{parsedJson.style}"</span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "quality"</span>
              <span className="text-slate-500">: </span>
              <span className="text-primary">"{parsedJson.quality}"</span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "reference_image"</span>
              <span className="text-slate-500">: </span>
              <span className="text-primary">
                "{parsedJson.reference_image}"
              </span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "language"</span>
              <span className="text-slate-500">: </span>
              <span className="text-primary">"{parsedJson.language}"</span>
              <br />
              <span className="text-cyan-400">{'}'}</span>
            </pre>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Ensaio
