# flux-hooks
Hooks implementation for Facebook [Flux Util](https://github.com/facebook/flux#Flux%20Utils)'s Stores.

This takes advantage of the new [React Hooks API](https://reactjs.org/docs/hooks-intro.html), and is a great alternative to using Flux-Util's [Container](https://facebook.github.io/flux/docs/flux-utils.html#container).

This is a very simple implementation using a combination of [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) & [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer).

## Install
```npm add flux-hooks``` or ```yarn add flux-hooks```

## API


const **value_from_store** = (**prevState**, **store**) => {...}

const **value** = **useFluxStore**(**store**: \<FluxStore>, **value_from_store**: Function, *deps*)

# Usage

## Basic Usage
Using the [CounterStore example](https://facebook.github.io/flux/docs/flux-utils.html#content) from Flux Utils. 

~~~
import useFluxStore from 'flux-hooks';

const CounterComponent = () => {
  const counter = useFluxStore(CounterStore, (prevState, store) => store.getState())

  return <CounterUI counter={counter} />;
}
~~~

## Dependencies

There are cases where the reducer is using other State/Prop values. Normally useReducer would not trigger a dispatch in this case. We use the **deps** parameter of useFluxStore as a list. 

~~~
import useFluxStore from 'flux-hooks';
const SearchComponent = () => {
  const [query, setQuery] = useState("")
  const results = useFluxStore(SearchStore, (prevState, store) => store.getSearchResults(query))

  return <div>
    <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
    <ul>
      results.map(r => <li>{r}</li>)
  </ul>
  </div>
}
~~~