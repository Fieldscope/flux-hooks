# flux-hooks
Hooks implementation for Facebook [Flux Util](https://github.com/facebook/flux#Flux%20Utils)'s Stores.

This takes advantage of the new [React Hooks API](https://reactjs.org/docs/hooks-intro.html), and is a great alternative to using Flux-Util's [Container](https://facebook.github.io/flux/docs/flux-utils.html#container).

This is an implementation using a combination of [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) & [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) and [lodash.isequal](#strict-equality).


## Install
```npm add flux-hooks``` or ```yarn add flux-hooks```

## API


const **value_from_store** = (**prevState**, **store**) => {...}

const **value** = **useFluxStore**(**store**: \<FluxStore>, **value_from_store**: Function, **deps?**: Array, **strictEquality?**: boolean)

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

## Dependencies - **deps**

The **deps** parameter is an Array of values as used by useCallback/useMemo.

In cases where the reducer is using other State/Prop, pass them as deps. Normally useReducer would not trigger a dispatch in this case.

~~~
import useFluxStore from 'flux-hooks';

const SearchComponent = () => {
  const [query, setQuery] = useState("")

  const results = useFluxStore(SearchStore, (prevState, store) => store.getSearchResults(query), [query])

  return <div>
    <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
    <ul>
      results.map(r => <li>{r}</li>)
  </ul>
  </div>
}
~~~

## Strict Equality
### Default: **OFF**

Stores can update frequently with our reducer selecting only a small subset of the values. In the cases if you apply a filter on an [Immutable-js](https://immutable-js.github.io/immutable-js/docs) objects, or return multiple values using an Object, this will cause the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) equality check to fail. This defeats the purpose of using the reducer!

To prevent this, **[lodash.isequal](https://www.npmjs.com/package/lodash.isequal) is used by default**. This does a deep check whenever the reducer is run, to make sure nothing has changed. 

The assumption here is that the equality check is cheaper to run than a re-render.

To **opt out** of using the more expensive lodash.isequal check set **strictEquality** (4th argument) to **true**. This will return to useReducer's default behaviour.