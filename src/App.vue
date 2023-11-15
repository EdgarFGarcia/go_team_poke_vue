<template>
  <v-app>
    <v-main>
      <v-snackbar
        v-model="mSnackbar.show" 
        bottom="bottom" 
        multi-line="multi-line" 
        :timeout="4000" 
        :vertical="true">
        {{ mSnackbar.message }}<br/>
        <v-btn v-if="mSnackbar.button" @click="sendotp" color="primary">Click here to send out new OTP</v-btn>
      </v-snackbar>
      <component
        :is="layout"
      >
        <router-view/>
      </component>
    </v-main>
  </v-app>
</template>

<script>
const defaultLayout = 'default';
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
  },
  computed: {
    layout(){
      return (this.$route.meta.layout || defaultLayout) + '-layout';
    },
    ...mapGetters({
      mSnackbar:            'auth/mSnackbar' 
    })
  },
  data: () => ({
    //
  }),
};
</script>
