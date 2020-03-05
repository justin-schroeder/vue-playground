<template>
    <Layout>

        <!-- Learn how to use images here: https://gridsome.org/docs/images
        <g-image alt="Example image" src="~/favicon.png" width="135"/>-->

        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </Layout>
</template>


<script>
  import Layout from '~/layouts/Default.vue'
  export default {
    components: {
      Layout
    },
    metaInfo: {
      title: 'Hello, world!'
    },
    data: function() {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    }
  }
</script>

<style>
    .home-links a {
        margin-right: 1rem;
    }
</style>
