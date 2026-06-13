export type ColorScheme = {
  id: string
  label: string
  color: string
  text: string
}

// Paleta global de colores del marco (un solo color sólido por esquema), compartida por todos los temas.
export const COLOR_SCHEMES: ColorScheme[] = [
  { id: 'rose', label: 'Rosa', color: '#A65A6B', text: '#ffffff' },
  { id: 'blue', label: 'Azul', color: '#4A6E96', text: '#ffffff' },
  { id: 'purple', label: 'Violeta', color: '#6A4A96', text: '#ffffff' },
  { id: 'green', label: 'Verde', color: '#3E8E5F', text: '#ffffff' },
  { id: 'orange', label: 'Naranja', color: '#B5703A', text: '#ffffff' },
  { id: 'gold', label: 'Dorado', color: '#9A7B2E', text: '#ffffff' },
  { id: 'teal', label: 'Turquesa', color: '#2F8E84', text: '#ffffff' },
  { id: 'red', label: 'Rojo', color: '#B0453F', text: '#ffffff' },
  { id: 'navy', label: 'Azul Marino', color: '#3A4A78', text: '#ffffff' },
  { id: 'coral', label: 'Coral', color: '#C75D45', text: '#ffffff' },
  { id: 'mint', label: 'Menta', color: '#4FA378', text: '#ffffff' },
  { id: 'lavender', label: 'Lavanda', color: '#6E5FA0', text: '#ffffff' },
  { id: 'charcoal', label: 'Grafito', color: '#444B57', text: '#ffffff' },
  { id: 'burgundy', label: 'Bordó', color: '#7A3047', text: '#ffffff' },
]

export type Theme = {
  id: string
  label: string
  emoji: string
  defaultHeader: string
  defaultNamePrefix: string
  leftIcons: string[]
  rightIcons: string[]
  defaultColorId: string
}

export const THEMES: Theme[] = [
  {
    id: 'seguridad-higiene',
    label: 'Seguridad e Higiene',
    emoji: '⛑️',
    defaultHeader: 'SEGURIDAD E HIGIENE',
    defaultNamePrefix: 'Licenciada',
    leftIcons: ['📅', '📈', '🚧', '⚠️', '💻'],
    rightIcons: ['👑', '💡', '🚦', '🧯', '⛑️'],
    defaultColorId: 'rose',
  },
  {
    id: 'medicina',
    label: 'Medicina',
    emoji: '🩺',
    defaultHeader: 'MEDICINA',
    defaultNamePrefix: 'Doctora',
    leftIcons: ['🩺', '💊', '🏥', '🧬', '💉'],
    rightIcons: ['❤️', '🔬', '📋', '🩻', '⚕️'],
    defaultColorId: 'blue',
  },
  {
    id: 'gastronomia',
    label: 'Gastronomía',
    emoji: '👨‍🍳',
    defaultHeader: 'GASTRONOMÍA',
    defaultNamePrefix: 'Chef',
    leftIcons: ['🍽️', '🔪', '🥘', '🧁', '🍷'],
    rightIcons: ['⭐', '📖', '🌿', '⚖️', '🎂'],
    defaultColorId: 'orange',
  },
  {
    id: 'derecho',
    label: 'Derecho',
    emoji: '⚖️',
    defaultHeader: 'DERECHO',
    defaultNamePrefix: 'Abogada',
    leftIcons: ['⚖️', '📜', '🏛️', '🔨', '📁'],
    rightIcons: ['👑', '🎯', '📚', '✍️', '🌟'],
    defaultColorId: 'gold',
  },
]

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

export function getColorScheme(colorId: string): ColorScheme {
  return COLOR_SCHEMES.find((c) => c.id === colorId) ?? COLOR_SCHEMES[0]
}
