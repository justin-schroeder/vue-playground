# Rediculously Reusable Components

via https://github.com/ridiculously-reusable-components/workshop-resources

## example 1 - button composition
The point: props explode quickly the more options you get
* it works
* it's not wrong

### problems with props-based solution
* new req's increase complexity
* multiple responsibilities
* lots of conditionals in template
* "low flexibility"
* hard to maintain

### RECOMMENDED SOLUTION to button composition
* pass in a prop

It's not fun to read a list of api to use your button

### What if you want multiple slots - use named slots
```vue


```

* something about hashtag or pound meaning slot name, but _don't do that_
you might need dynamic slot names: `v-slot:[dynamicSlotName]`

### scoped slots
`v-slot="scope"`
* we're exposing the scope of the containing slot
* it can access the scope from the slot: 
* you'll hear of term "slot props"
* √ I wish that there were numbers on the slides
* imagine that template is a function and you are passing the argument
