export const getButtonClasses = (from: string, to: string) => {
  return `text-white font-semibold py-2 px-4 rounded-full shadow transition-all
    bg-gradient-to-r from-${from} to-${to}
    hover:from-${from.replace(/[0-9]+/, (n) => String(+n + 100))}
    hover:to-${to.replace(/[0-9]+/, (n) => String(+n + 100))}`
}

export const getBigButtonDivClasses = () => {
  return 'flex flex-wrap justify-center gap-3'
}
