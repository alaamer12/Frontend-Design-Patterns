# About
this design pattern emphasis is a complex design pattern

# Our Example
in our example you can see clearly to fulfill our requirement and using dependency injection we had to use `react-di` and `inversify` libraries

## what is happening
first we create our needed service it can be created with different ways, as a hook, as a class, as a function, ...etc.
then we bind our service to the container and use the binding method [singleton]
then we use our service in our component wrapped with `Provider` component from `react-di`
