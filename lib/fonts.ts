// Tipografías disponibles en el editor. El `family` debe coincidir con el nombre real de Google Fonts
// (se cargan vía <link> en app/layout.tsx) y es el valor que recibe Konva en fontFamily.
export const FONTS: { family: string; label: string }[] = [
  { family: 'Montserrat', label: 'Montserrat' },
  { family: 'Poppins', label: 'Poppins' },
  { family: 'Playfair Display', label: 'Playfair' },
  { family: 'Oswald', label: 'Oswald' },
  { family: 'Bebas Neue', label: 'Bebas Neue' },
  { family: 'Lobster', label: 'Lobster' },
  { family: 'Pacifico', label: 'Pacifico' },
  { family: 'Dancing Script', label: 'Dancing Script' },
]

export const FONT_FAMILIES = FONTS.map((f) => f.family)
