<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12 >
                  <v-data-table
                    :headers="headers"
                    :items="desserts"
                    item-key="name"
                    group-by="Отделение"
                    class="elevation-1"
                    show-group-by
                    hide-default-footer
                    :search="search"
                    v-show="view"
                ></v-data-table>
                <div
                    v-show="!view"
                >
                    <v-data-table      
                    :headers="headersWithoutDepartments"
                    :items="desserts"     
                    item-key=name
                    group-by="Отделение"
                    class="elevation-1"
                    hide-default-footer
                    :search="search"
                    >    
                    <template v-slot:group="{ items, expand }">
                        <tr>
                        <td  class="text-xs-right"><h3><span class="primary--text">{{ items[0].Отделение }}</span></h3></td>
                        <td ></td>
                        <td ></td>
                        
                        </tr>
                        <tr v-for="(item) in items" :key="item.name">
                        <td v-for="header in headersWithoutDepartments"
                            :key="header.name"
                        >
                            {{ item[header.value] }}
                        </td> 
                        </tr>
                    </template>
                    </v-data-table>
                </div>
                </v-flex>
            </v-layout>
        </v-container>        
    </div>
    <div v-else class="text-center">
        <v-container>
            <v-layout row>
                <v-flex xs12 class="pt-5">
                    <v-progress-circular
                    :size="100"
                    :width="4"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters([
          'headers',
          'desserts',
          'search',
           'headersWithoutDepartments',
           'departments',
           'employeeDepartment',
           'view'         
        ]),
        promoAds(){
            return this.$store.getters.promoAds
        },
        ads(){
            return this.$store.getters.ads
        },
        loading(){
            return this.$store.getters.loading;
        }
    }
}
</script>

<style scoped>
    .car-link{
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0,0,0,.5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>