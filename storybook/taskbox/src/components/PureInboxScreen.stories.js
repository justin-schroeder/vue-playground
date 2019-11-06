import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/vue";
import Vue from "vue";
import Vuex from "vuex";

import { defaultTaskList } from "./PureTaskList.stories";
import PureInboxScreen from "./PureInboxScreen.vue";

// see https://www.learnstorybook.com/intro-to-storybook/vue/en/screen/
Vue.use(Vuex);

// we are passing the store below to each story
export const store = new Vuex.Store({
  state: {
    tasks: defaultTaskList
  },
  actions: {
    pinTask(context, id) {
      action("pinTask")(id);
    },
    archiveTask(context, id) {
      action("archiveTask")(id);
    }
  }
});

storiesOf("PureInboxScreen", module)
  .add("default", () => {
    return {
      components: { PureInboxScreen },
      template: `<pure-inbox-screen/>`,
      // here is where the store is passed
      // this helps us mock the store for the PureInboxScreen
      store
    };
  })
  .add("error", () => {
    return {
      components: { PureInboxScreen },
      template: `<pure-inbox-screen :error="true"/>`
    };
  });
