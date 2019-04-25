# flux-hooks
Hooks implementation for Facebook Flux Util's Stores.

This takes advantage of the new [React Hooks API](https://reactjs.org/docs/hooks-intro.html), and is a great alternative to using Flux-Util's [Container](https://facebook.github.io/flux/docs/flux-utils.html#container).

This is a very simple implementation using a combination of [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) & [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer).

## Install
```npm add flux-hooks``` or ```yarn add flux-hooks```

## API


const **value_from_store** = (**prevState**, **store**) => {...}

const **value** = **useFluxStore**(**store**: \<FluxStore>, **value_from_store**: Function)

## Usage

Using the [CounterStore example](https://facebook.github.io/flux/docs/flux-utils.html#content) from Flux Utils. 

~~~
import useFluxStore from 'flux-hooks';

const CounterComponent = () => {
  const counter = useFluxStore(CounterStore, (prevState, store) => CounterStore.getState())

  return <CounterUI counter={counter} />;
}
~~~