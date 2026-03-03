import { mockDb } from '@/lib/supabase-mock'

export interface CoreTraits {
  gender: string
  age: number
  ethnicity?: string
}

export interface CharacterProfile {
  id: string
  name: string
  core_traits: CoreTraits
  visual_description_en: string
  created_at: string
  updated_at: string
  current_version: number
}

export interface CharacterDnaVersion {
  id: string
  profile_id: string
  version_number: number
  dna_snapshot: any
  change_summary: string
  created_at: string
}

export class CharacterProfileRepository {
  private static readonly PROFILES_TABLE = 'character_profiles'
  private static readonly VERSIONS_TABLE = 'character_dna_versions'

  static async getProfiles(): Promise<CharacterProfile[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockDb
      .getTable<CharacterProfile>(this.PROFILES_TABLE)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
  }

  static async createProfile(
    name: string,
    coreTraits: CoreTraits,
    visualDescription: string,
  ): Promise<CharacterProfile> {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    const newProfile: CharacterProfile = {
      id,
      name,
      core_traits: coreTraits,
      visual_description_en: visualDescription,
      created_at: now,
      updated_at: now,
      current_version: 1,
    }

    mockDb.insert(this.PROFILES_TABLE, newProfile)
    this.saveVersionSnapshot(id, 1, newProfile, 'Initial profile creation')

    return newProfile
  }

  static async updateProfile(
    id: string,
    updates: {
      name?: string
      core_traits?: CoreTraits
      visual_description_en?: string
    },
  ): Promise<CharacterProfile> {
    const profiles = mockDb.getTable<CharacterProfile>(this.PROFILES_TABLE)
    const existing = profiles.find((p) => p.id === id)

    if (!existing) throw new Error('Profile not found')

    // MutationGuard System: Protect immutable core traits
    if (updates.core_traits) {
      const currentTraits = JSON.stringify(existing.core_traits)
      const newTraits = JSON.stringify(updates.core_traits)
      if (currentTraits !== newTraits) {
        throw new Error(
          'MUTATION_GUARD: Core traits (Gender, Age) are immutable once finalized.',
        )
      }
    }

    const nextVersion = existing.current_version + 1
    const updatedProfile = mockDb.update(this.PROFILES_TABLE, id, {
      ...updates,
      updated_at: new Date().toISOString(),
      current_version: nextVersion,
    })

    this.saveVersionSnapshot(
      id,
      nextVersion,
      updatedProfile,
      `Updated ${updates.visual_description_en ? 'visual description' : 'profile'}`,
    )

    return updatedProfile
  }

  private static saveVersionSnapshot(
    profileId: string,
    versionNumber: number,
    snapshot: any,
    summary: string,
  ) {
    const version: CharacterDnaVersion = {
      id: crypto.randomUUID(),
      profile_id: profileId,
      version_number: versionNumber,
      dna_snapshot: snapshot,
      change_summary: summary,
      created_at: new Date().toISOString(),
    }
    mockDb.insert(this.VERSIONS_TABLE, version)
  }
}
