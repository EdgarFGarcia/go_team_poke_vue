<template>
    <v-container fluid>
        <v-row>
            <v-col
                cols="2"
                v-for="(pokemon, pokemonindex) in getPokeList"
                :key="pokemonindex"
            >
                <v-card>
                    <v-card-title>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            {{ pokemon.name }}
                        </label>
                        <v-spacer/>
                        <label
                            style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                            @click="showDetails(pokemon.url)"
                        >
                           show more details
                        </label>
                    </v-card-title>
                    <v-card-title>
                        <v-col
                            cols="12"
                        >
                            <v-img
                                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonindex+1}.png`"
                            />
                        </v-col>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            text
                            small
                            class="pl-10 pr-10"
                            @click="addToHate(pokemon, pokemonindex+1)"
                        >
                            hate
                        </v-btn>
                        <v-btn
                            color="primary"
                            small
                            class="pl-10 pr-10"
                            @click="addToLike(pokemon, pokemonindex+1)"
                        >
                            like
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <PokemonDetail
            :value="showDetailsBool"
            @close_dialog="close_dialog"
        />
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import PokemonDetail from '@/modules/auth/user/components/PokemonDetailComponent.vue'
export default {
    components: {
        PokemonDetail
    },
    async mounted(){
        await this.getPokeListFn()
    },
    data () {
        return {
            showDetailsBool: false
        }
    },
    computed:{
        ...mapGetters({
            getPokeList:        'home/getPokemonList',
            getUser:            'auth/getUser'
        })
    },
    methods:{
        showSnackBar(message){
            this.$store.commit("auth/setMessage", 
            {show: true, message: message}, 
            {root: 1})
        },
        async getPokeListFn(){
            const list = await this.$store.dispatch('home/getPokemonList')
            this.$store.dispatch('home/setPokeList', list.data.results)
        },
        async showDetails(url){
            const detail = await this.$store.dispatch('home/getPokemonDetail', url)
            this.$store.dispatch('home/setPokemonDetail', detail.data)
            this.showDetailsBool = true
        },
        close_dialog(){
            this.showDetailsBool = false
        },
        async addToHate(data, index){
            let pass = {
                user_id: this.getUser.id,
                index:  index,
                name:   data.name,
                url:    data.url
            }
            const hate = await this.$store.dispatch('home/addTohate', pass)
            if(hate.status === 200){
                this.showSnackBar(hate.data.message)
            }
            const dataa = await this.$store.dispatch('home/getHatedPokemon', this.getUser.id)
            await this.$store.dispatch('home/setHatedPokemon', dataa.data.data)
        },
        async addToLike(data, index){
            let pass = {
                user_id: this.getUser.id,
                index:  index,
                name:   data.name,
                url:    data.url
            }
            const like = await this.$store.dispatch('home/addToLike', pass)
            if(like.status === 200){
                this.showSnackBar(like.data.message)
            }
            const dataa = await this.$store.dispatch('home/getLikedPokemon', this.getUser.id)
            await this.$store.dispatch('home/setLikedPokemon', dataa.data.data)
        }
    }
}
</script>