import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
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
        title: 'Missing Images',
        description: 'Please upload both a reference image and your photo.',
        variant: 'destructive',
      })
      return
    }

    const json = {
      task: 'character_transformation',
      reference_style: 'user_uploaded_reference',
      subject: 'user_uploaded_photo',
      quality: '8K ultra realistic, cinematic quality, high-end cinematography',
      lighting: 'cinematic',
      output_format: 'professional_photography',
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col gap-8 min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-[#FFC107]/10 rounded-2xl mb-2 border border-[#FFC107]/20 shadow-[0_0_30px_-5px_rgba(255,193,7,0.25)]">
          <Wand2 className="h-8 w-8 text-[#FFC107]" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Cinematic Transformation
        </h2>
        <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl mx-auto">
          Upload a reference character or outfit and your photo to generate a
          professional 8K AI prompt in JSON format.
        </p>
      </div>

      <Card className="p-6 md:p-8 border-border bg-card shadow-2xl rounded-2xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reference Image Section */}
          <div className="space-y-4">
            <Label className="text-base font-bold text-foreground tracking-wide flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#FFC107]" />
              1. Reference Image
            </Label>
            <p className="text-xs text-muted-foreground">
              Target outfit, style, or character
            </p>
            <div
              onClick={() => referenceInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-[#FFC107]/50 bg-background/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[250px]"
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
                    className="max-h-48 object-contain rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Upload className="w-5 h-5" /> Change
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-[#FFC107] transition-colors">
                  <div className="p-4 bg-secondary rounded-full border border-border group-hover:border-[#FFC107]/30 shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Upload Reference</span>
                </div>
              )}
            </div>
          </div>

          {/* User Photo Section */}
          <div className="space-y-4">
            <Label className="text-base font-bold text-foreground tracking-wide flex items-center gap-2">
              <User className="w-5 h-5 text-[#FFC107]" />
              2. Your Photo
            </Label>
            <p className="text-xs text-muted-foreground">
              The person to be transformed
            </p>
            <div
              onClick={() => userInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-[#FFC107]/50 bg-background/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[250px]"
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
                    className="max-h-48 object-contain rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Upload className="w-5 h-5" /> Change
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-[#FFC107] transition-colors">
                  <div className="p-4 bg-secondary rounded-full border border-border group-hover:border-[#FFC107]/30 shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Upload Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          className="w-full h-14 rounded-xl bg-[#FFC107] hover:bg-[#FFC107]/90 text-black font-extrabold text-base tracking-wide shadow-[0_0_25px_-5px_rgba(255,193,7,0.4)] transition-all active:scale-[0.98]"
        >
          <Sparkles className="mr-2 h-5 w-5 text-black" />
          GENERATE CINEMATIC PROMPT
        </Button>
      </Card>

      {generatedJson && (
        <Card className="overflow-hidden border border-border shadow-2xl bg-card rounded-2xl relative animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFC107]/50 to-transparent" />

          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background/50">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFC107]">
                transformation.json
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-[#FFC107] hover:text-[#FFC107] hover:bg-[#FFC107]/10 h-9 gap-2 px-4 rounded-lg border border-[#FFC107]/20 transition-all active:scale-95"
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
              <span className="text-cyan-400"> "task"</span>
              <span className="text-slate-500">: </span>
              <span className="text-emerald-400">
                "character_transformation"
              </span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "reference_style"</span>
              <span className="text-slate-500">: </span>
              <span className="text-emerald-400">
                "user_uploaded_reference"
              </span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "subject"</span>
              <span className="text-slate-500">: </span>
              <span className="text-emerald-400">"user_uploaded_photo"</span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "quality"</span>
              <span className="text-slate-500">: </span>
              <span className="text-emerald-400">
                "8K ultra realistic, cinematic quality, high-end cinematography"
              </span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "lighting"</span>
              <span className="text-slate-500">: </span>
              <span className="text-emerald-400">"cinematic"</span>
              <span className="text-slate-500">,</span>
              <br />
              <span className="text-cyan-400"> "output_format"</span>
              <span className="text-slate-500">: </span>
              <span className="text-emerald-400">
                "professional_photography"
              </span>
              <br />
              <span className="text-cyan-400">{'}'}</span>
            </pre>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Transform
