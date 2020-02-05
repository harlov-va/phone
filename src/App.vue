<template>
  <v-app>
    <v-app-bar app color="primary" dark>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Телефонный справочник</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>

      <v-btn 
      text icon
      @click="changeView"
      >
        <v-icon>mdi-recycle</v-icon>
      </v-btn>
  </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
        <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        :value="true"
        :bottom="'bottom'"
        color="error"      
        :multi-line="true"      
        :timeout="5000"      
        @input="closeError"
        @value="true"
      >
        {{error}}
        <v-btn
          dark
          text
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed:{
    ...mapGetters([
      'view'
    ]),
    search: {
      get () {
        return this.$store.state.search
      },
      set (value) {
        this.$store.dispatch('updateSearch', value)
      }
    },
    error(){
      return this.$store.getters.error;
    },
    isUserLoggedIn(){
      return this.$store.getters.isUserLoggedIn;
    },
    links(){
      if(this.isUserLoggedIn){
        return [
          {title:'Orders',icon:'mdi-bookmark-outline',url:'/orders'},
          {title:'New ad',icon:'mdi-note-plus-outline',url:'/new'},
          {title:'My ads',icon:'mdi-format-list-bulleted-square',url:'/list'}
        ]
      }
      return [
        {title:'Login',icon:'mdi-lock',url:'/login'},
        {title:'Registration',icon:'mdi-face',url:'/registration'}
      ]
    }
  },
  methods:{
    closeError(){
      this.$store.dispatch('clearError');
    },
    onLogout(){
      this.$store.dispatch('logoutUser');
      this.$router.push('/');
    },
    changeView(){
      this.$store.dispatch('changeView', !this.view)
    }
  }
};
</script>

<style scoped>
  .pointer{
    cursor: pointer
    }
  
</style>
