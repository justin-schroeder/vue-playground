<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Application Testing in Vue.js](#application-testing-in-vuejs)
  - [Links](#links)
    - [Login Form 1 > Show and Demo the form](#login-form-1--show-and-demo-the-form)
    - [Login Form 2 (Stubs, Mocks, and Spies)](#login-form-2-stubs-mocks-and-spies)
- [9.1 | 15 minutes](#91--15-minutes)
- [9.2 | 10 minutes](#92--10-minutes)
- [9.3 | 5 minutes](#93--5-minutes)
    - [Component Lifecycle](#component-lifecycle)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Application Testing in Vue.js
By ALEX KYRIAKIDIS, _Creator of VueSchool.io and Vue.js Community Partner_

_Learn all there is to know about unit testing Vue.js applications. 
We start with essentials topics, like what unit testing is, what 
features/code you should write tests for, and the fundamentals of the 
testing framework developed by Facebook, called Jest. This workshop also 
covers advanced topics, like integrating the official vue-test-utils library, 
testing vue.js component features, DOM integration, testing VueX, 
snapshot testing, mocks & stubs, and many more._

## Links
* https://www.notion.so/Login-Form-8d13aba5a6574bc58dddcf8c3ec81374
* https://www.notion.so/Login-Form-3-Mock-Component-Dependencies-54e62a4fbedd422f88298a170383838b
* https://github.com/rahaug/testing-workshop-boilerplate

### Login Form 1 > Show and Demo the form

- In your projects directory, clone [this repository](https://github.com/rahaug/testing-workshop-boilerplate) and install the dependencies (if you don't have it)

    git clone https://github.com/rahaug/testing-workshop-boilerplate
    cd testing-workshop-boilerplate
    yarn

**A | 5 minutes**

- create a new `FormLogin.spec.js` file in the `tests/unit` directory
- create test: `sets email from prop`
    - import the `FormLogin` component and mount it with an `email` prop.
    - expect that `form.email` is equal to the `email` prop that was passed in.

**B | 5 minutes**

- create test: `is not valid with empty email and password`
    - Mount `FormLogin` component
    - expect that the `isValid` computed property is falsy when no email or password is given

**~~C | 5 minutes~~**

- create test: `is not valid with empty password`
    - Mount `FormLogin` component
    - set `form.email` data property to a valid email
    - expect that the `isValid` computed property is falsy

**D | 5 minutes**

- Create test: `is valid with email and password`
    - Mount `FormLogin` component
    - Assign the `form` data a valid email and password (any password)
    - Expect that the `isValid` computed property is truthy

**E | 10 minutes**

- create test: `input fields are bound to form data`
    - Mount `FormLogin` component
    - Find and set the email input field to a valid email
    - Find and set the password input field to a valid password (any password)
    - Expect that the `form` data contain email and password

**F | 5 minutes**

- Create test: `should render validation when dirty and invalid`
    - Mount `FormLogin` component
    - Set the `isDirty` data property to true
    - Make sure the form data is invalid
    - Expect the template to contain a “Please fill in both fields.” string

> Tip: Remember to trigger the next render with wrapper.vm.$nextTick()

**G | 5 minutes**

- Create test: `has a submit button`
    - Mount `FormLogin` component
    - Expect that the template contains a button with the type of `submit`

### [Login Form 2 (Stubs, Mocks, and Spies)](https://www.notion.so/Login-Form-2-Stubs-Mocks-and-Spies-dd579c63a9994c0bba93cc8f30de6b53)
# 9.1 | 15 minutes

- Create async test: `it shows api errors`
    - Import `auth` in top of test file: `import {auth} from '../../src/api`
    - Stub the `login` property of `auth`. Return a rejected `Promise`
    - Set form data to valid `email` and `password`
    - Invoke the `login` method
    - ~~Expect that the `hasError` data property is `true`~~
    - Expect that the api error is displayed in the template
    - Restore mock to original implementation

# 9.2 | 10 minutes

- Create async test: `shows validation error if missing inputs and submitting`
    - Mount the `FormLogin` component
    - Invoke the `login` method
    - Expect the template to contain `Please fill in both fields.`

> *Tip: Catch and mute the thrown exception*

# 9.3 | 5 minutes

- Create async test: `doesn't hit API endpoint when form data are invalid`
    - Mount the `FormLogin` component
    - Invoke the `login` method with invalid data
    - Expect that `auth.login()` is not called
    
### [Component Lifecycle](https://www.notion.so/Component-Lifecycle-03c4955adaa64aa1a37d63f8c05d2d39)
exercises - 45 min
http://bit.ly/2vhmCFF

last link: https://bit.ly/2TbTf10