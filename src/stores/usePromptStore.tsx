import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_HISTORY } from '@/lib/data'

export interface PromptDraft {
  nicheId?: string
  option?: string
  character?: string
}

export interface PromptResult {
  id: string
  nicheId: string
  nicheTitle: string
  nicheIcon: string
  option: string
  character: string
  date: string
  timeDisplay?: string
  json: any
}

interface PromptContextType {
  draft: PromptDraft
  setDraft: (draft: Partial<PromptDraft>) => void
  history: PromptResult[]
  addResult: (result: PromptResult) => void
  clearDraft: () => void
}

const PromptContext = createContext<PromptContextType | undefined>(undefined)

export function PromptProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<PromptDraft>({})
  const [history, setHistory] = useState<PromptResult[]>(MOCK_HISTORY)

  const setDraft = (updates: Partial<PromptDraft>) => {
    setDraftState((prev) => ({ ...prev, ...updates }))
  }

  const addResult = (result: PromptResult) => {
    setHistory((prev) => [result, ...prev])
  }

  const clearDraft = () => {
    setDraftState({})
  }

  return (
    <PromptContext.Provider
      value={{ draft, setDraft, history, addResult, clearDraft }}
    >
      {children}
    </PromptContext.Provider>
  )
}

export default function usePromptStore() {
  const context = useContext(PromptContext)
  if (context === undefined) {
    throw new Error('usePromptStore must be used within a PromptProvider')
  }
  return context
}
