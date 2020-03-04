<template>
    <Layout>

        <!-- Learn how to use images here: https://gridsome.org/docs/images
        <g-image alt="Example image" src="~/favicon.png" width="135"/>-->

        <p class="home-links">
            <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
            <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
        </p>

        <br/>

            <v-row align="center">
                <v-col class="text-center" cols="12" sm="4">
                    <div class="my-2">
                        <v-btn small>Normal</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn small color="primary">Primary</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn small color="error">Error</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn small disabled>Disabled</v-btn>
                    </div>
                </v-col>
                <v-col class="text-center" cols="12" sm="4">
                    <div class="my-2">
                        <v-btn>Normal</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn color="primary">Primary</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn color="error">Error</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn disabled>Disabled</v-btn>
                    </div>
                </v-col>
                <v-col class="text-center" cols="12" sm="4">
                    <div class="my-2">
                        <v-btn large>Normal</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn large color="primary">Primary</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn large color="error">Error</v-btn>
                    </div>
                    <div class="my-2">
                        <v-btn large disabled>Disabled</v-btn>
                    </div>
                </v-col>
            </v-row>
    </Layout>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Hello, world!'
    }
  }
</script>

<style>
    .home-links a {
        margin-right: 1rem;
    }
</style>
