import axios from 'axios'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        pokemon_list: [],
        pokemon_details: {},
        hated_pokemon: [],
        liked_pokemon: [],
        other_users: []
    },
    mutations: {
        setPokemonList(state, payload){
            state.pokemon_list = [...payload]
        },
        setPokemonDetail(state, payload){
            state.pokemon_details = {}
            state.pokemon_details = payload
        },
        setHatedPokemon(state, payload){
            state.hated_pokemon = [...payload]
        },
        setLikedPokemon(state, payload){
            state.liked_pokemon = [...payload]
        },
        setOtherUsers(state, payload){
            state.other_users = [...payload]
        }
    },
    getters: {
        getPokemonList : state => state.pokemon_list,
        getPokemonDetail : state => state.pokemon_details,
        getHatedPokemon : state => state.hated_pokemon,
        getLikedPokemon : state => state.liked_pokemon,
        getOtherUsers : state => state.other_users
    },
    actions: {
        async getPokemonList(){
            return await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0')
        },
        setPokeList({commit}, payload){
            commit('setPokemonList', payload)
        },
        async getPokemonDetail(_, payload){
            return await axios.get(payload)
        },
        setPokemonDetail({commit}, payload){
            commit('setPokemonDetail', payload)
        },
        async addTohate(_, payload){
            return await Vue.axios.post('/pokemon/addHate', payload)
        },
        async getHatedPokemon(_, payload){
            return await Vue.axios.get(`/pokemon/getHate/${payload}`)
        },
        async setHatedPokemon({commit}, payload){
            await commit('setHatedPokemon', payload)
        },
        async addToLike(_, payload){
            return await Vue.axios.post('/pokemon/addLike', payload)
        },
        async getLikedPokemon(_, payload){
            return await Vue.axios.get(`/pokemon/getLike/${payload}`)
        },
        async setLikedPokemon({commit}, payload){
            await commit('setLikedPokemon', payload)
        },
        async getOtherUser(){
            return await Vue.axios.get('/pokeUsers/getListUser')
        },
        async setOtherUsers({commit}, payload){
            await commit('setOtherUsers', payload)
        }
    }
}