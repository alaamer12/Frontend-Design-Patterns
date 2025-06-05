# About
this design pattern emphasis making your project in terms of:
1. states: are a pieces of data that can be changed
2. reducer: it is a function that takes a state and an action and returns a new [reduced] state
3. reducer provider: it is the provider of the component which it handles the outer reduce functions
4. reducer consumer: it is the consumer of the component which it handles the inner reduce functions


# Note
this pattern considered one of the hardest, because reducers and dispatchers are increasing the application complexity, also it has to be made properly.

the idea of this pattern that there is a component handles its own reducer, but this component can be overridden by other components reduce function.

