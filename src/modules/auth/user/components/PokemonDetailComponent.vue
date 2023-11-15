<template>
    <v-row justify="center">
        <v-dialog
            :value="value"
            persistent
            max-width="560"
        >
            <v-card>
                <v-card-title>
                    <label
                        style="font-family: Nunito Sans; font-size: 16px; font-weight: 700;"
                    >
                        {{ getPokemonDetail.name }}
                    </label>
                    <v-spacer/>
                    <v-icon
                        style="cursor: pointer;"
                        @click="close_dialog()"
                    >
                        mdi-close
                    </v-icon>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="6"
                        >
                            <v-card>
                                <v-img
                                    v-if="Object.keys(getPokemonDetail).length > 0"
                                    :src="`${getPokemonDetail.sprites.front_default}`"
                                />
                            </v-card>
                        </v-col>
                        <v-col
                            cols="6"
                        >
                            <v-card>
                                <v-img
                                    v-if="Object.keys(getPokemonDetail).length > 0"
                                    :src="`${getPokemonDetail.sprites.back_default}`"
                                />
                            </v-card>
                        </v-col>
                        <v-col
                            cols="4"
                        >
                            <label
                                style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                            >
                                Stats
                            </label>
                            <ul>
                                <li
                                    v-for="(stat, statindex) in getPokemonDetail.stats"
                                    :key="statindex"
                                >
                                    <label
                                        style="font-family: Nunito Sans; font-size: 14px; font-weight: 500"
                                    >
                                        Base Stat: <strong>{{ stat.base_stat }}</strong>
                                    </label>
                                    <label
                                        style="font-family: Nunito Sans; font-size: 14px; font-weight: 500; display: block;"
                                    >
                                        Stat Name: <strong>{{ stat.stat.name }}</strong>
                                    </label>
                                </li>
                            </ul>
                        </v-col>
                        <v-col
                            cols="4"
                        >
                            <label
                                style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                            >
                                Abilities
                            </label>
                            <ul>
                                <li
                                    v-for="(ability, abilityindex) in getPokemonDetail.abilities"
                                    :key="abilityindex"
                                >
                                    <label
                                        style="font-family: Nunito Sans; font-size: 14px; font-weight: 500"
                                    >
                                        {{ ability.ability.name }}
                                    </label>
                                </li>
                            </ul>
                        </v-col>
                        <v-col
                            cols="4"
                        >
                            <label
                                style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                            >
                                Types
                            </label>
                            <ul>
                                <li
                                    v-for="(type, typeindex) in getPokemonDetail.types"
                                    :key="typeindex"
                                >
                                    <label
                                        style="font-family: Nunito Sans; font-size: 14px; font-weight: 500"
                                    >
                                        {{ type.type.name }}
                                    </label>
                                </li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: [
        'value'
    ],
    computed:{
        ...mapGetters({
            getPokemonDetail:        'home/getPokemonDetail'
        })
    },
    methods: {
        close_dialog(){
            this.$emit('close_dialog')
        }
    }
}
</script>