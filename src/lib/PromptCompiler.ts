import { STYLE_PRESETS, CARTOON_STYLES, generateMetadata } from './data'

export class PromptCompiler {
  private static applyIntelligentPresets(text: string, baseSpecs: any) {
    const lowerText = text.toLowerCase()
    let specs = { ...baseSpecs }

    if (
      lowerText.includes('cyberpunk') ||
      lowerText.includes('neon') ||
      lowerText.includes('futurist')
    ) {
      specs = { ...specs, ...STYLE_PRESETS.cyberpunk }
    }
    if (
      lowerText.includes('medieval') ||
      lowerText.includes('cavaleiro') ||
      lowerText.includes('dragão') ||
      lowerText.includes('castelo') ||
      lowerText.includes('mística')
    ) {
      specs = { ...specs, ...STYLE_PRESETS.medieval }
    }
    if (
      lowerText.includes('pixar') ||
      lowerText.includes('3d') ||
      lowerText.includes('animaç') ||
      lowerText.includes('cartoon') ||
      lowerText.includes('disney')
    ) {
      specs = { ...specs, ...STYLE_PRESETS.pixar }
    }

    return specs
  }

  static compileConsistentCharacter({
    nicheEn,
    dnaGender,
    dnaAge,
    dnaDescription,
    sceneCount,
    scenesData,
  }: any) {
    const genderEn = dnaGender === 'male' ? 'Male' : 'Female'
    const charDnaEn = `Gender: ${genderEn}, Age: ${dnaAge}. Visual Description: [TRANSLATE TO ENGLISH] ${dnaDescription.trim()}`

    const baseSpecs = {
      quality:
        'Ultra Premium, 8K, ultra-realistic, cinematic lighting, high resolution, sharp focus, highly detailed, photorealistic, masterpiece, professional cinematography, no blur, perfectly crisp',
      style: 'High-end commercial photography, modern aesthetic',
      lighting: 'Balanced studio lighting, consistent across all scenes',
    }

    const combinedText = `${dnaDescription} ${scenesData.map((s: any) => s.idea).join(' ')}`
    const specs = this.applyIntelligentPresets(combinedText, baseSpecs)

    return {
      task: 'consistent_character_storytelling',
      niche_en: nicheEn,
      character_dna_en: {
        gender: dnaGender,
        age: parseInt(dnaAge, 10) || 25,
        visual_description_pt: dnaDescription.trim(),
      },
      technical_specifications_en: specs,
      scene_count: sceneCount,
      scenes: scenesData.map((data: any, idx: number) => {
        const baseIdea = data.idea.trim()
        return {
          scene_number: idx + 1,
          visual_action_description_en: baseIdea
            ? `[TRANSLATE TO ENGLISH & ENHANCE] Scene ${idx + 1}. Character Profile: (${charDnaEn}). Action based on: "${baseIdea}"`
            : `[AUTO-GENERATE IN ENGLISH] Scene ${idx + 1} of ${sceneCount}. Character Profile: (${charDnaEn}). Create a highly detailed visual action description seamlessly continuing the narrative.`,
          character_speech_pt_br: baseIdea
            ? `[EXTRACT SPEECH/NARRATIVE IN PT-BR] Aprimore a fala ou crie uma narração natural em Português do Brasil baseada em: "${baseIdea}"`
            : `[AUTO-GENERATE SCRIPT IN PT-BR] Crie a fala/narração para a cena ${idx + 1} em Português do Brasil, alinhada à sequência lógica do personagem.`,
        }
      }),
      system_instruction:
        "CRITICAL: Programmatically injected Character DNA metadata MUST be maintained across every scene's visual description. All visual action descriptions MUST be in English. All character speech and dialogues MUST be STRICTLY in Brazilian Portuguese (pt-BR).",
    }
  }

  static compileNiche({
    nicheEn,
    selectedOption,
    optionEn,
    selectedCharacter,
    characterName,
    characterEn,
    customCharacterDesc,
    isCartoon,
    cartoonStyle,
    sceneIdea,
  }: any) {
    const { estilo, iluminacao } = generateMetadata(selectedOption)

    let qualitySettings =
      'Ultra Premium, 8K, ultra-realistic, cinematic lighting, high resolution, sharp focus, highly detailed, photorealistic, masterpiece, professional cinematography, no blur, perfectly crisp'
    if (isCartoon) {
      qualitySettings =
        'Ultra Premium, 8K, high resolution, sharp focus, highly detailed, masterpiece, perfect animation quality, vibrant, clean lines, perfectly crisp'
    }

    let finalStyle = isCartoon
      ? CARTOON_STYLES.find((s: any) => s.id === cartoonStyle)?.en || estilo
      : estilo

    let charProfileEn = ''
    if (selectedCharacter === 'custom') {
      charProfileEn = isCartoon
        ? `Ultra Premium, highly detailed character design of ${customCharacterDesc.trim()}. Perfectly capturing the animation style, expressive features, and vivid colors.`
        : `Ultra Premium, highly detailed, ultra-realistic portrait of ${customCharacterDesc.trim()}. The subject is deeply humanized with authentic skin texture, expressive eyes, natural posture, and a highly professional appearance. Rendered as a masterpiece portrait.`
    } else {
      charProfileEn = `Ultra Premium, ${characterEn || characterName || selectedCharacter}`
    }

    const fallbackScriptPt = `[AUTO-GENERATE SCRIPT] Crie um roteiro/diálogo envolvente, natural e altamente profissional em Português do Brasil (pt-BR) focado em '${selectedOption}', para ser dito por: ${characterName}.`

    const baseSpecs = {
      quality: qualitySettings,
      lighting: iluminacao,
      camera: isCartoon
        ? 'Perfect framing, clear composition, ultra premium render'
        : 'Sharp focus, perfectly crisp, no blur, DSLR 50mm lens',
      style: finalStyle,
    }

    const combinedText = `${selectedOption} ${sceneIdea} ${finalStyle}`
    const specs = this.applyIntelligentPresets(combinedText, baseSpecs)

    return {
      task: 'professional_content_generation',
      niche_en: nicheEn,
      narrative_concept_en: optionEn || selectedOption,
      subject_and_character_en: charProfileEn,
      technical_specifications_en: specs,
      scene_and_action_en: sceneIdea.trim()
        ? `[TRANSLATE TO ENGLISH & ENHANCE] Highly detailed visual prompt based on: "${sceneIdea.trim()}"`
        : `[AUTO-GENERATE VISUAL IN ENGLISH] Highly detailed visual scene description for the concept: '${optionEn || selectedOption}'.`,
      audio_and_speech: {
        language: 'pt-BR',
        character_speech_pt_br: sceneIdea.trim()
          ? `[REWRITE & HUMANIZE] Reescreva o seguinte texto como uma fala/narração profissional em Português do Brasil: "${sceneIdea.trim()}"`
          : fallbackScriptPt,
      },
      system_instruction:
        'CRITICAL: All technical metadata and visual action descriptions MUST be in English. All dialogue, spoken lines, and narrations MUST be in Brazilian Portuguese (pt-BR).',
    }
  }

  static compileEnsaio({ promptInput, hasImage }: any) {
    const baseSpecs = {
      quality: '8K ultra realistic, highly detailed, perfect lighting',
      style: 'Professional photography, masterpiece, ultra premium',
      camera: 'DSLR 85mm portrait lens',
    }

    const specs = this.applyIntelligentPresets(promptInput, baseSpecs)

    return {
      task: 'professional_photoshoot',
      subject_en: promptInput.trim()
        ? `[TRANSLATE TO ENGLISH] ${promptInput}`
        : 'Professional high-end photoshoot subject',
      reference_image_en: hasImage ? 'user_provided' : 'none',
      technical_specifications_en: specs,
      system_instruction:
        'All technical parameters and descriptions MUST be in English.',
    }
  }

  static compileTransform({ sceneIdea, hasReference, hasUserImage }: any) {
    const baseSpecs = {
      quality:
        'Ultra Premium, 8K ultra realistic, cinematic quality, high-end cinematography',
      lighting: 'cinematic',
      lens: '50mm cinematic lens',
    }

    const specs = this.applyIntelligentPresets(sceneIdea, baseSpecs)

    return {
      task: 'character_transformation',
      reference_style_en: hasReference ? 'user_uploaded_reference' : 'none',
      subject_en: hasUserImage ? 'user_uploaded_photo' : 'none',
      scene_context_en: sceneIdea.trim()
        ? `[TRANSLATE TO ENGLISH] ${sceneIdea}`
        : 'Default cinematic transformation scene',
      technical_specifications_en: specs,
      output_format_en: 'professional_photography',
      system_instruction: 'All parameters must be in English.',
    }
  }
}
