# taskbox - [example from learnstorybook.com](https://www.learnstorybook.com/intro-to-storybook/vue/en/get-started/)

This is a test project created from a tutorial at https://www.learnstorybook.com/. 


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Techniques

### Presentation Components vs Container Components
[Presentational and Container Components by Dan Abramov - Mar 2015](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* note Dan Abramov sites [React Hooks](https://reactjs.org/docs/hooks-custom.html) as 
  a way around this now
  * not sure if there is an equivalent method for Vue yet

Presentational Components - they only render from props and do not internally access or mutate state
Container Components - they access the state of the application and return Presentational Components mostly

## Addons
https://www.learnstorybook.com/intro-to-storybook/vue/en/using-addons/
* great point = we can have QA change parameters to see different UI states (huge text)
