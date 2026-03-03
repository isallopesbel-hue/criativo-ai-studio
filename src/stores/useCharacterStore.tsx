import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import {
  CharacterProfileRepository,
  CharacterProfile,
  CoreTraits,
} from '@/repositories/CharacterProfileRepository'
import { useToast } from '@/hooks/use-toast'

interface CharacterContextType {
  profiles: CharacterProfile[]
  activeProfile: CharacterProfile | null
  isLoading: boolean
  setActiveProfile: (profile: CharacterProfile | null) => void
  loadProfiles: () => Promise<void>
  createProfile: (
    name: string,
    traits: CoreTraits,
    desc: string,
  ) => Promise<CharacterProfile | null>
  updateProfile: (id: string, updates: any) => Promise<CharacterProfile | null>
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined,
)

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<CharacterProfile[]>([])
  const [activeProfile, setActiveProfile] = useState<CharacterProfile | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const loadProfiles = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await CharacterProfileRepository.getProfiles()
      setProfiles(data)
    } catch (error) {
      console.error('Failed to load profiles', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfiles()
  }, [loadProfiles])

  const createProfile = async (
    name: string,
    traits: CoreTraits,
    desc: string,
  ) => {
    try {
      const newProfile = await CharacterProfileRepository.createProfile(
        name,
        traits,
        desc,
      )
      setProfiles((prev) => [newProfile, ...prev])
      toast({
        title: 'Character created',
        description: `${name} saved successfully.`,
      })
      return newProfile
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      return null
    }
  }

  const updateProfile = async (id: string, updates: any) => {
    try {
      const updated = await CharacterProfileRepository.updateProfile(
        id,
        updates,
      )
      setProfiles((prev) => prev.map((p) => (p.id === id ? updated : p)))
      if (activeProfile?.id === id) setActiveProfile(updated)
      toast({
        title: 'Character updated',
        description: `Version ${updated.current_version} saved.`,
      })
      return updated
    } catch (error: any) {
      if (error.message.includes('MUTATION_GUARD')) {
        toast({
          title: 'MutationGuard Blocked Update',
          description:
            'Core traits like Age and Gender cannot be changed after creation to maintain consistency.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error updating',
          description: error.message,
          variant: 'destructive',
        })
      }
      return null
    }
  }

  return (
    <CharacterContext.Provider
      value={{
        profiles,
        activeProfile,
        isLoading,
        setActiveProfile,
        loadProfiles,
        createProfile,
        updateProfile,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacterStore() {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error('useCharacterStore must be used within a CharacterProvider')
  }
  return context
}
