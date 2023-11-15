<template>
    <div>
        <v-app-bar
            color="primary"
            dark
            elevation="0"
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
                v-if="Object.keys(getUser).length === 0"
                @click="showAuthModal"
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <v-row
            v-if="Object.keys(getUser).length === 0"
            justify="center"
        >
            <label
                style="font-family: Nunito Sans; font-size: 24px; font-weigth: large"
                class="mt-15"
            >
                Please <label
                    style="text-decoration: underline; cursor: pointer;"
                    @click="auth_dialog_state = !auth_dialog_state"
                >Login</label> to continue
            </label>
        </v-row>
        <auth-dialog
            :value="auth_dialog_state"
            @close_dialog="close_dialog"
        ></auth-dialog>
        <slot/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthDialog from '@/modules/user/component/AuthModal.vue'
export default {
    components: {
        AuthDialog
    },
    data () {
        return {
            auth_dialog_state: false
        }
    },
    mounted(){
        if(localStorage.getItem('vuex') !== null){
            this.$router.push({name: '/home'})
        }
    },
    computed: {
        ...mapGetters({
            getUser:            'auth/getUser'
        })
    },
    methods: {
        showAuthModal(){
            this.auth_dialog_state = true
        },
        close_dialog(){
            this.auth_dialog_state = false
        }
    }
}
</script>