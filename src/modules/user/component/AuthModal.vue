<template>
    <div class="text-center">
      <v-dialog
        :value="value"
        width="500"
        persistent
      >
        <v-card
            v-if="!is_register"
        >
          <v-card-title>
            <label
                style="font-family: Nunito Sans"
            >
                Login
            </label>
            <v-spacer/>
            <v-icon
                style="cursor: pointer;"
                @click="close_dialog"
            >
                mdi-close
            </v-icon>
          </v-card-title>
  
          <v-card-text>
            <v-text-field
                outlined
                label="username or email"
                dense
                prepend-inner-icon="mdi-account"
                type="text"
                v-model="l.email"
            >
            </v-text-field>
            <v-text-field
                outlined
                label="username or email"
                dense
                prepend-inner-icon="mdi-lock"
                append-icon="mdi-eye-lock"
                type="password"
                v-model="l.password"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                text
                @click="is_register = !is_register"
            >
                Register
            </v-btn>
            <v-btn
                color="secondary"
                dark
                class="pl-10 pr-10"
                @click="loginFn()"
            >
                Login
            </v-btn>
        </v-card-actions>
        </v-card>
        <!-- register -->
        <v-card
            v-else
        >
            <v-card-title>
                <label
                    style="font-family: Nunito Sans"
                >
                    Register
                </label>
                <v-spacer/>
                <v-icon
                    style="cursor: pointer;"
                    @click="close_dialog"
                >
                    mdi-close
                </v-icon>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="r.name"
                    type="text"
                    prepend-inner-icon="mdi-account"
                    outlined
                    dense
                    label="Name"
                >
                </v-text-field>
                <v-text-field
                    v-model="r.email"
                    type="email"
                    prepend-inner-icon="mdi-at"
                    outlined
                    dense
                    label="Email"
                >
                </v-text-field>
                <v-text-field
                    v-model="r.password"
                    :type="show_password_r_1 ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    :append-icon="show_password_r_1 ? 'mdi-eye-lock' : 'mdi-eye-lock-open'"
                    outlined
                    dense
                    label="Password"
                    @click:append="show_password_r_1 = !show_password_r_1"
                >
                </v-text-field>
                <v-text-field
                    v-model="r.rpassword"
                    :type="show_password_r_2 ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    :append-icon="show_password_r_2 ? 'mdi-eye-lock' : 'mdi-eye-lock-open'"
                    outlined
                    dense
                    label="Re-type Password"
                    @click:append="show_password_r_2 = !show_password_r_2"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    text
                    @click="is_register = !is_register"
                >
                    Login
                </v-btn>
                <v-btn
                    color="secondary"
                    dark
                    class="pl-10 pr-10"
                    @click="registerFn()"
                >
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>

  <script>
  export default {
    props: [
        'value'
    ],
    data() {
        return {
            is_register: false,
            l: {
                email: null,
                password: null
            },
            r: {
                name: null,
                email: null,
                password: null,
                rpassword: null
            },
            show_password_r_1: false,
            show_password_r_2: false
        }
    },
    methods: {
        showSnackBar(message){
            this.$store.commit("auth/setMessage", 
            {show: true, message: message}, 
            {root: 1})
        },
        close_dialog(){
            this.l = {}
            this.r = {}
            this.is_register = false
            this.$emit('close_dialog')
        },
        async registerFn(){
            if(this.r.password != this.r.rpassword){
                alert('password did not match!')
                return
            }
            const register = await this.$store.dispatch('auth/registerUser', this.r)
            if(register.data.response){
                this.showSnackBar(register.data.message)
                this.close_dialog()
                return
            }
        },
        async loginFn(){
            const login = await this.$store.dispatch('auth/loginUser', this.l)
            if(login.data.response){
                await this.$store.dispatch('auth/userInfo', login.data.data)
                await this.$store.dispatch('auth/userToken', login.data.token)
                localStorage.setItem('token', login.data.token)
                this.$router.push({name: '/home'})
                this.close_dialog()
                return
            }
            this.showSnackBar('Something went wrong!')
        }
    }
  }
  </script>