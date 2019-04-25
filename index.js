import { useEffect, useReducer } from 'react';

export function useFluxStore(store, storeReducer) {
  const [out, _dispatch] = useReducer((prevState, store) => {
    return storeReducer(prevState, store)
  }, storeReducer(null, store))

  useEffect(() => {
    function listener() {
      _dispatch(store)
    }

    const token = store.addListener(listener)
    return () => {
      token.remove()
    }
  })
  return out
}

export default useFluxStore