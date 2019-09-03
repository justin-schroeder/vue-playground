# 04 State Management

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [04-01 Introducing State Management](#04-01-introducing-state-management)
  - [History](#history)
  - [Veux](#veux)
- [04-02 Challenge 8: Passing Props](#04-02-challenge-8-passing-props)
  - [Description](#description)
  - [Challenge 8: Passing Props Completion](#challenge-8-passing-props-completion)
- [04-03 Challenge 8: Passing Props Solution](#04-03-challenge-8-passing-props-solution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 04-01 Introducing State Management
[Introducing State Management Video](https://frontendmasters.com/courses/advanced-vue/introducing-state-management/)
[Introducing State Manaagement Slides](https://docs.google.com/presentation/d/1TgDx4DN8YqfdndYWMovBcQVPWyKLTNcbo1YS8XlLo9o/edit#slide=id.g1e6824c3c2_0_347)
[Introducing State Manaagement Transcript](./transcripts/21-introducing-state-management.txt)

### History
* Facebook's flux really changed and in some ways invented state management in the front end.
* Flux was the first to have unidirectional data flow.
* Dan Abramov: _Flux patterns are like glasses, you know it when you need it._

### Veux
[Vue Docs: Veux](https://vuex.vuejs.org/guide/)

## 04-02 Challenge 8: Passing Props
[Challenge 8: Passing Props Video](https:// frontendmasters.com/courses/advanced-vue/challenge-8-passing-props/)
[Challenge 8: Passing Props Transcript](./transcripts/22-challenge-8-passing-props.txt)
[Challenge 8: Passing Props Code](./code/4-state-management/4.1-passing-props.html)
[Challenge 8: Passing Props Test](./code/4-state-management/__test__/4.1.test.js)

### Description
requirement: a counter component rendered 3 times
the component takes the current count via props
and a button that increments all 3 counters at once
`<counter :count="count"></counter>`

We have to implement the counter component

### 04-02 Challenge 8: Passing Props Completion
See my code at [Challenge 8: Passing Props Code](./code/4-state-management/4.1-passing-props.html)
I pretty quickly got it, but I do wonder about way to provide template rather than render func
Tests are passing

## 04-03 Challenge 8: Passing Props Solution
[Challenge 8: Passing Props Solution Video](https://frontendmasters.com/courses/advanced-vue/challenge-8-solution/)
