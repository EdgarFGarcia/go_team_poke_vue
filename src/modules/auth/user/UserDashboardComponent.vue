<template>
    <v-container fluid>
        <v-row>
            <v-col
                cols="2"
            >
                <v-card>
                    <v-card-title>
                        <label
                            style="font-family: Nunito Sans; font-size: 16px; font-weight: 700;"
                        >
                            {{ getUser.name }}
                        </label>
                        <v-spacer/>
                        <label
                            style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                            @click="logoutFn()"
                        >
                            logout
                        </label>
                    </v-card-title>
                    <v-card-subtitle>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px;"
                        >
                            {{ getUser.email }}
                        </label>
                    </v-card-subtitle>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Liked Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in getLikedPokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated.url)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Hated Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in getHatedPokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated.url)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                </v-card>
                <PokemonDetail
                    :value="showDetailsBool"
                    @close_dialog="close_dialog"
                />
            </v-col>
            <v-col
                cols="8"
            >
                <PokeList/>
            </v-col>
            <v-col
                cols="2"
            >
                <v-card
                    v-for="(other, otherindex) in getOtherUsers"
                    :key="otherindex"
                    class="mt-5"
                >
                    <v-card-title>
                        <label
                            style="font-family: Nunito Sans; font-size: 16px; font-weight: 700;"
                        >
                            {{ other.name }}
                        </label>
                    </v-card-title>
                    <v-card-subtitle>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px;"
                        >
                            {{ other.email }}
                        </label>
                    </v-card-subtitle>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Liked Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in other.get_like_pokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated.url)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Hated Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in other.get_hate_pokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated.url)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PokeList from '@/modules/auth/user/components/PokeListComponent.vue'
import PokemonDetail from '@/modules/auth/user/components/PokemonDetailComponent.vue'
export default {
    components: {
        PokeList,
        PokemonDetail
    },
    data () {
        return {
            showDetailsBool: false
        }
    },
    async mounted(){
        this.getHatedPokemonFn()
        this.getLikedPokemonFn()
        this.getOtherUser()
    },
    computed:{
        ...mapGetters({
            getUser:                'auth/getUser',
            getHatedPokemon:        'home/getHatedPokemon',
            getLikedPokemon:        'home/getLikedPokemon',
            getOtherUsers:          'home/getOtherUsers'
        })
    },
    methods: {
        async logoutFn(){
            await this.$axios.post('/logout')
            localStorage.clear()
            this.$router.push({name: '/'})
            location.reload()
        },
        async getHatedPokemonFn(){
            const data = await this.$store.dispatch('home/getHatedPokemon', this.getUser.id)
            await this.$store.dispatch('home/setHatedPokemon', data.data.data)
        },
        async showDetails(url){
            const detail = await this.$store.dispatch('home/getPokemonDetail', url)
            this.$store.dispatch('home/setPokemonDetail', detail.data)
            this.showDetailsBool = true
        },
        close_dialog(){
            this.showDetailsBool = false
        },
        async getLikedPokemonFn(){
            const data = await this.$store.dispatch('home/getLikedPokemon', this.getUser.id)
            await this.$store.dispatch('home/setLikedPokemon', data.data.data)
        },
        async getOtherUser(){
            const data = await this.$store.dispatch('home/getOtherUser')
            await this.$store.dispatch('home/setOtherUsers', data.data.data)
        }
    }
}
</script>