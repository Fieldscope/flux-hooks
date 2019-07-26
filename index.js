import {
  useEffect, useReducer, useMemo,
} from 'react';


import isEqual from 'lodash.isequal';

// useFluxStore combines useReducer and useEffect to use with FluxStores
// useReducer: Used to extract relevant values from the store
// useEffect is used to attach a listener to the store


export function useFluxStore(store, reducer, deps = [], strictEquality = false) {
  // We use Lodash's isEqual check to make sure the state hasn't changed
  // This can be expensive, but cheaper than a re-render
  function reducerWithEqualityCheck(_p, _store) {
    const refreshVal = reducer(_p, _store);

    if (isEqual(refreshVal, _p)) return _p;
    return refreshVal;
  }

  const [out, _dispatch] = useReducer(
    strictEquality ? reducer : reducerWithEqualityCheck,
    reducer(null, store),
  );

  // Watch dependencies, and dispatch if they change
  useMemo(() => {
    _dispatch(store);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    // Listener that is called when store is updated
    function listener() {
      // We dispatch the store to the reducer
      _dispatch(store);
    }

    // Attach listener to store
    const token = store.addListener(listener);

    // This avoids potentially missing an update between useReducer --> render --> useEffect
    _dispatch(store);

    // On useEffect destruction, remove the listener
    return token.remove;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // We make sure to pass [] so we're not attaching/detaching on every render

  return out; // Reducer value gets returned to useFluxStore
}


export default useFluxStore;
