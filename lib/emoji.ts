import data from '@emoji-mart/data'
import type { EmojiMartData } from '@emoji-mart/data'

// Mapa carácter nativo → codepoint "unified" (ej. "📅" → "1f4c5", "🧑‍🍳" → "1f9d1-200d-1f373").
// Cubre tonos de piel y secuencias ZWJ porque recorre todas las skins de cada emoji.
const nativeToUnified = new Map<string, string>()
for (const emoji of Object.values((data as EmojiMartData).emojis)) {
  for (const skin of emoji.skins) {
    nativeToUnified.set(skin.native, skin.unified)
  }
}

// URL de la imagen real (estilo Apple, igual que el picker) servida por jsDelivr con CORS.
export function emojiToImageUrl(native: string): string | null {
  const unified = nativeToUnified.get(native)
  if (!unified) return null
  return `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${unified}.png`
}
