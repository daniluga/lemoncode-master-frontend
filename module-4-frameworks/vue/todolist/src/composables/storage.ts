/**
 * Composable
 * -----------------------------------------------------------------------------
 * Una composable en Vue es una función reutilizable que encapsula lógica
 * reactiva y se puede usar en varios componentes.
 *
 * Por ejemplo, en lugar de repetir la misma lógica en distintos componentes,
 * puedes crear una composable y simplemente llamarla donde la necesites.
 *
 *
 * localstorage es -> clave: valor
 */
export const useStorage = <T>(storageKey: string) => {
  const get = () => {
    const value = localStorage.getItem(storageKey)
    return value ? (JSON.parse(value) as T) : []
  }

  const set = (value: T) => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }

  return { get, set }
}
