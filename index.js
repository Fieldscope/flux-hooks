import { useEffect, useReducer } from 'react';

// useFluxStore essentially combines useReducer and useEffect to use with FluxStores
// useReducer: Used to extract relevant values from the store
// useEffect is used to attach a listener to the store

export function useFluxStore(store, reducer) {
  // Call useReducer and set initial value from current state of store.

  // We need to pass reducer(null, store) as initialArg otherwise the first out will be undefined
  const [out, _dispatch] = useReducer(reducer, reducer(null, store));

  useEffect(() => {
    function listener() {
      // When store is updated, we dispatch an update to the reducer
      _dispatch(store);
    }

    // Attach reducer's listener to store
    const token = store.addListener(listener);

    // Instead of setting initial value as the second parameter on the useReducer, dispatch here:
    // This avoids missing an update between useReducer --> render --> useEffect
    _dispatch(store);

    // On useEffect destruction, remove the listener
    return () => token.remove();
  },
  []); // We make sure to pass [] so we're not attaching/detaching  on every render
  return out; // Reducer value gets returned to useFluxStore
}

export default useFluxStore;
