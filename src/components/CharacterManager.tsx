import { useState, useEffect } from 'react'
import { useCharacterStore } from '@/stores/useCharacterStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  ShieldAlert,
  Plus,
  CheckCircle2,
  UserCircle2,
  Save,
  History,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function CharacterManager() {
  const {
    profiles,
    activeProfile,
    setActiveProfile,
    createProfile,
    updateProfile,
  } = useCharacterStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState('')
  const [gender, setGender] = useState('female')
  const [age, setAge] = useState('25')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    if (!activeProfile && profiles.length > 0 && !isFormOpen) {
      setActiveProfile(profiles[0])
    }
  }, [profiles, activeProfile, isFormOpen, setActiveProfile])

  const handleOpenNew = () => {
    setIsEditing(false)
    setName('')
    setGender('female')
    setAge('25')
    setDesc('')
    setActiveProfile(null)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (profile: any) => {
    setIsEditing(true)
    setName(profile.name)
    setGender(profile.core_traits.gender)
    setAge(profile.core_traits.age.toString())
    setDesc(profile.visual_description_en)
    setActiveProfile(profile)
    setIsFormOpen(true)
  }

  const handleSave = async () => {
    if (!name.trim() || !desc.trim() || !age) return

    if (isEditing && activeProfile) {
      const updated = await updateProfile(activeProfile.id, {
        name,
        core_traits: { gender, age: parseInt(age, 10) },
        visual_description_en: desc,
      })
      if (updated) {
        setIsFormOpen(false)
        setActiveProfile(updated)
      }
    } else {
      const created = await createProfile(
        name,
        { gender, age: parseInt(age, 10) },
        desc,
      )
      if (created) {
        setIsFormOpen(false)
        setActiveProfile(created)
      }
    }
  }

  if (isFormOpen) {
    return (
      <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6 animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {isEditing ? (
              <History className="w-5 h-5 text-primary" />
            ) : (
              <Plus className="w-5 h-5 text-primary" />
            )}
            {isEditing
              ? `Editar DNA (Versão ${activeProfile?.current_version})`
              : 'Novo Personagem'}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFormOpen(false)}
          >
            Cancelar
          </Button>
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <Label className="text-sm font-bold">Nome do Personagem</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Alex Vance"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3 relative group">
              <Label className="text-sm font-bold flex items-center gap-2">
                Gênero{' '}
                {isEditing && (
                  <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                )}
              </Label>
              <RadioGroup
                value={gender}
                onValueChange={setGender}
                className="flex gap-3"
                disabled={isEditing}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="r1" />
                  <Label htmlFor="r1">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="r2" />
                  <Label htmlFor="r2">Feminino</Label>
                </div>
              </RadioGroup>
              {isEditing && (
                <p className="text-xs text-muted-foreground mt-1">
                  Core trait protegido (MutationGuard)
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold flex items-center gap-2">
                Idade Aparente{' '}
                {isEditing && (
                  <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                )}
              </Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={isEditing}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold">
              Descrição Visual (Será otimizada em Inglês)
            </Label>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Descreva roupas, cabelo, estilo..."
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleSave} className="w-full h-12 font-bold gap-2">
            <Save className="w-4 h-4" /> Salvar Perfil
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profiles.map((p) => {
          const isSelected = activeProfile?.id === p.id
          return (
            <div
              key={p.id}
              onClick={() => setActiveProfile(p)}
              className={cn(
                'relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-primary/40',
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <UserCircle2
                    className={cn(
                      'w-5 h-5',
                      isSelected ? 'text-primary' : 'text-muted-foreground',
                    )}
                  />
                  <span
                    className={cn('font-bold', isSelected && 'text-primary')}
                  >
                    {p.name}
                  </span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {p.visual_description_en}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-[10px] font-mono font-semibold px-2 py-1 bg-secondary rounded-md">
                  v{p.current_version}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs px-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenEdit(p)
                  }}
                >
                  Editar DNA
                </Button>
              </div>
            </div>
          )
        })}
        <div
          onClick={handleOpenNew}
          className="border-2 border-dashed border-border hover:border-primary/50 bg-background/50 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[120px] transition-colors"
        >
          <Plus className="w-6 h-6 text-muted-foreground mb-2" />
          <span className="font-bold text-sm text-muted-foreground">
            Criar Novo Personagem
          </span>
        </div>
      </div>
    </div>
  )
}
