export type ColorScheme = {
  id: string
  label: string
  primary: string
  header: string
  ribbon: string
  text: string
}

export type Theme = {
  id: string
  label: string
  emoji: string
  defaultHeader: string
  defaultNamePrefix: string
  leftIcons: string[]
  rightIcons: string[]
  colors: ColorScheme[]
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
    colors: [
      { id: 'rose', label: 'Rosa', primary: '#C4919A', header: '#8B5E65', ribbon: '#E8B4BB', text: '#ffffff' },
      { id: 'blue', label: 'Azul', primary: '#7B9EC4', header: '#4A6E96', ribbon: '#A8C4E0', text: '#ffffff' },
      { id: 'purple', label: 'Violeta', primary: '#9B7BC4', header: '#6A4A96', ribbon: '#C4A8E0', text: '#ffffff' },
      { id: 'green', label: 'Verde', primary: '#7BC49B', header: '#4A9668', ribbon: '#A8E0C0', text: '#ffffff' },
    ],
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
    colors: [
      { id: 'blue', label: 'Azul', primary: '#7B9EC4', header: '#4A6E96', ribbon: '#A8C4E0', text: '#ffffff' },
      { id: 'rose', label: 'Rosa', primary: '#C4919A', header: '#8B5E65', ribbon: '#E8B4BB', text: '#ffffff' },
      { id: 'green', label: 'Verde', primary: '#7BC49B', header: '#4A9668', ribbon: '#A8E0C0', text: '#ffffff' },
      { id: 'purple', label: 'Violeta', primary: '#9B7BC4', header: '#6A4A96', ribbon: '#C4A8E0', text: '#ffffff' },
    ],
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
    colors: [
      { id: 'orange', label: 'Naranja', primary: '#C4A07B', header: '#96724A', ribbon: '#E0C4A8', text: '#ffffff' },
      { id: 'rose', label: 'Rosa', primary: '#C4919A', header: '#8B5E65', ribbon: '#E8B4BB', text: '#ffffff' },
      { id: 'green', label: 'Verde', primary: '#7BC49B', header: '#4A9668', ribbon: '#A8E0C0', text: '#ffffff' },
      { id: 'blue', label: 'Azul', primary: '#7B9EC4', header: '#4A6E96', ribbon: '#A8C4E0', text: '#ffffff' },
    ],
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
    colors: [
      { id: 'gold', label: 'Dorado', primary: '#C4B07B', header: '#96824A', ribbon: '#E0CCA8', text: '#ffffff' },
      { id: 'blue', label: 'Azul', primary: '#7B9EC4', header: '#4A6E96', ribbon: '#A8C4E0', text: '#ffffff' },
      { id: 'purple', label: 'Violeta', primary: '#9B7BC4', header: '#6A4A96', ribbon: '#C4A8E0', text: '#ffffff' },
      { id: 'rose', label: 'Rosa', primary: '#C4919A', header: '#8B5E65', ribbon: '#E8B4BB', text: '#ffffff' },
    ],
    defaultColorId: 'gold',
  },
]

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

export function getColorScheme(theme: Theme, colorId: string): ColorScheme {
  return theme.colors.find((c) => c.id === colorId) ?? theme.colors[0]
}
