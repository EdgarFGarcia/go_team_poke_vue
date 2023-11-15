<template>
    <div>
        <v-app-bar
            color="primary"
            dark
        >
            <v-toolbar-title>
                <label
                    style="font-family: Nunito Sans; font-size: 16px;"
                >
                    Go Team Pokedex
                </label>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="logoutFn()"
                dark
            >
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <slot/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            getUser:            'auth/getUser'
        })
    },
    methods: {
        async logoutFn(){
            await this.$axios.post('/logout')
            localStorage.clear()
            this.$router.push({name: '/'})
            location.reload()
        }
    }
}
</script>