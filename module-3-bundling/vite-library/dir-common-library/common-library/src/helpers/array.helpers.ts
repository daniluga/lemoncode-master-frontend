/**
 * <Item, MappedItem> - tipos genéricos para entrada/salida.
 * Item -> tipo de los elementos del array de entrada.
 * MappedItem -> tipo de los elementos del array de salida.
 * 
 * ⚠️ Nota: Item/MappedItem son nombres de tipo genérico, pueden ser cualquier nombre.
 * Comúnmente se usan T, U, etc.
 * 
 * @param collection Parámetro de tipo array de elementos de tipo Item.
 * @param mapFn Parámetro de tipo función que recibe un elemento de tipo Item 
 * y devuelve un elemento de tipo MappedItem.	
 * @returns Un array de elementos de tipo MappedItem.
 */
export const mapCollection = <Item, MappedItem>(
  collection: Item[],
  mapFn: (item: Item) => MappedItem
): MappedItem[] => (Array.isArray(collection) ? collection.map(mapFn) : []);