## REACT-AUTO-COMPLETE

## Objective
To build an input component that is able to suggest to user what github repositories they might be looking in an intuitive and efficient manner

## Dependency
1. [github search api](https://developer.github.com/v3/search/)

## Key Features

### Data retrieval
1. Debounced event is attached to the retrieval of data to prevent over eager loading of latest search result
2. 5 minute caching on result set allows users to immediately obtain data that were still fresh
3. Dependent on github search api to provide the top 10 most accurate search result

### User experience
1. Navigation between recommended completion result can be done using arrow up and down or mouse hover
2. Auto complete help list is populated as soon as a change event happens

### Test
1. All helper methods are tested
2. Component testing are done through shallow rendering

### Folder structure
Files are group according to feature.
```
| - public
|   | - app.css
|   | - app.js
|   | - index.html
|
| - src
|   | - autocomplete
|   |   | - *.js
|   |   | - *.jsx
|   |   | - *.test
|   |   | - *.scss
|   | - helper
|   |   | - *.js
|   |   | - *.test
```

### Development
To install
```
yarn install
```

To build the required assets
```
yarn run build
yarn run dev //if you need a watcher
```
To start a server to serve the required assets
```
yarn run start
```
Open browser
```
visit http://localhost:5000
```

### Testing
```
yarn run test
```

## Improvements
1. Include behavioral testing on component
2. Bundle component as a standalone package for external usage (i.e. minify and uglify)
3. Increase test coverage for all components
4. Hooking up with CI/CD process

