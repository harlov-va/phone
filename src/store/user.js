import fb from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth'
import Vue from 'vue';
import { timeout } from 'q';

class User{
    constructor (id){
        this.id = id;
    }
}

export default{
    state:{
        user:null,
        search:'',
        headers: [],
        desserts: [],
        view:false
    },
    mutations:{
        setUser(state, payload){
            state.user = payload;
        },
        updateSearch(state, payload){
          state.search = payload;
        },
        changeView(state, payload){
          state.view = payload;
        },
        loadUsers(state, payload){
          state.desserts = payload;
        },
        loadHeaders(state, payload){
          state.headers = payload;
        }
    },
    actions:{
        async registerUser({commit},{email, password}){
            commit('clearError');
            commit('setLoading',true);
            try{
            const user = await fb.auth().createUserWithEmailAndPassword(email,password);
            commit('setUser',new User(user.uid));                    
            commit('setLoading',false);
            } catch (error){
                commit('setLoading',false);
                commit('setError',error.message);
                throw error;
            }
                // .then(user => {
                //     commit('setUser',new User(user.uid));                    
                //     commit('setLoading',false);
                // })
                // .catch(error => {
                //     commit('setLoading',false);
                //     commit('setError',error.message);
                // });
        },
        async loginUser({commit},{email, password}){
            commit('clearError');
            commit('setLoading',true);
            try{
            const response = await fb.auth().signInWithEmailAndPassword(email,password);                          
            commit('setUser',new User(response.user.uid));                    
            commit('setLoading',false);
            } catch (error){
                commit('setLoading',false);
                commit('setError',error.message);
                throw error;
            }
        },
        autoLogginUser({commit},payload){
            commit('setUser', new User(payload.uid));
        },
        logoutUser({commit}){
            fb.auth().signOut();
            commit('setUser',null);
        },
        updateSearch({commit},payload){
          commit('updateSearch',payload);
        },
        changeView({commit},payload){
          commit('changeView',payload);
        },
        async fetchUsers({commit, getters, dispatch}){
          commit('clearError');
          commit('setLoading',true);
          let result = [];
          try{              
              let response = await Vue.http.get('http://phone/users');              
              result = response.body;              
              result.forEach(element => {
                if(element.name){                  
                  let arrayTemp = element.name.split(' ');                  
                  arrayTemp.unshift(arrayTemp[arrayTemp.length -1]);
                  arrayTemp.pop();
                  element.name = arrayTemp.join(' ');
                };                
                if(element.phone){
                  let str = element.phone;
                  str = str.replace(/[^\d;]/g, '');                  
                  if(str[0] === '7'){ 
                    str = str.substring(1);
                    str = insert(str, 0, "8");
                  };                  
                  str = insert(str, 1, " (");                  
                  str = insert(str, 6, ") ");
                  str = insert(str, 11, "-");
                  str = insert(str, 14, "-");                  
                  element.phone = str;
                }
                if(element.title){
                  element.title = element.title[0].toUpperCase() + element.title.slice(1);;
                }
              });
              let resultHeaders = [];
              Object.keys(result[0]).forEach(item => {
                resultHeaders.push({
                  value: item
                });               
              });
              resultHeaders[0]['text'] = 'ФИО сотрудника';
              resultHeaders[0]['align'] = 'left';
              resultHeaders[1]['text'] = 'Телефон';
              resultHeaders[2]['text'] = 'Должность';
              resultHeaders[3]['text'] = 'Отделение';
              commit('loadHeaders',resultHeaders);
              commit('loadUsers',result);
              commit('setLoading',false);
              setInterval(() =>{dispatch('getIntervalUsers')}, 5000);              
          }
          catch (error){
              commit('setError',error.message);
              commit('setLoading',false);
              throw error;
          };
          function insert(str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
          }
        },
        async getIntervalUsers({commit}){
          let result = [];
          try{              
              let response = await Vue.http.get('http://phone/users');              
              result = response.body;              
              result.forEach(element => {
                if(element.name){                  
                  let arrayTemp = element.name.split(' ');                  
                  arrayTemp.unshift(arrayTemp[arrayTemp.length -1]);
                  arrayTemp.pop();
                  element.name = arrayTemp.join(' ');
                };                
                if(element.phone){
                  let str = element.phone;
                  str = str.replace(/[^\d;]/g, '');                  
                  if(str[0] === '7'){ 
                    str = str.substring(1);
                    str = insert(str, 0, "8");
                  };                  
                  str = insert(str, 1, " (");                  
                  str = insert(str, 6, ") ");
                  str = insert(str, 11, "-");
                  str = insert(str, 14, "-");                  
                  element.phone = str;
                }
                if(element.title){
                  element.title = element.title[0].toUpperCase() + element.title.slice(1);;
                }
              });
              let resultHeaders = [];
              Object.keys(result[0]).forEach(item => {
                resultHeaders.push({
                  value: item
                });               
              });
              resultHeaders[0]['text'] = 'ФИО сотрудника';
              resultHeaders[0]['align'] = 'left';
              resultHeaders[1]['text'] = 'Телефон';
              resultHeaders[2]['text'] = 'Должность';
              resultHeaders[3]['text'] = 'Отделение';
              commit('loadHeaders',resultHeaders);
              commit('loadUsers',result);              
            }
            catch (error){
                
            };
            function insert(str, index, value) {
              return str.substr(0, index) + value + str.substr(index);
            }
          }
    },
    getters:{
        user(state){
            return state.user;
        },
        isUserLoggedIn(state){
            return state.user !== null;
        },
        search(state){
            return state.search;
        },
        headers(state){
            return state.headers;
        },
        desserts(state){
            return state.desserts;
        },
        headersWithoutDepartments(state){
          return state.headers.slice(0,state.headers.length-1);
        },
        departments({desserts}){
          desserts.sort((prev, next) => {
            if ( prev.Отделение < next.Отделение ) return -1;
            if ( prev.Отделение < next.Отделение ) return 1;
          });
          let dep = [];
          for(let i = 0; i< desserts.length-1; i++){
            if(i===0) 
            {
              dep.push(desserts[i]);
              continue;
            }
            if(desserts[i].Отделение !== desserts[i-1].Отделение){
              dep.push(desserts[i]);
            }
          };
          return dep;
        },
        employeeDepartment: (state, getters) => (department) => {
          return getters.desserts.filter(item => item.Отделение === department);
        },
        view(state){
          return state.view;
        }
    }
}
// headers: [
//   {
//     text: 'ФИО сотрудника',
//     align: 'left',
//     value: 'name',
//   },          
//   {
//     text: 'Телефон', value: 'phone'
//   },
//   { text: 'Отделение', value: 'Отделение' }
// ],
// desserts: [
// {
//   name: 'Иванов Иван Иванович1',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Педиатрическое отделение',
// },
// {
//   name: 'Иванов Иван Иванович2',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Педиатрическое отделение',
// },
// {
//   name: 'Иванов Иван Иванович3',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Терапевтическое отделение',
// },
// {
//   name: 'Иванов Иван Иванович4',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Администрация',
// },
// {
//   name: 'Иванов Иван Иванович5',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Терапевтическое отделение',
// },
// {
//   name: 'Иванов Иван Иванович6',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Отделение инструментальной диагностики',
// },
// {
//   name: 'Иванов Иван Иванович7',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Отделение инструментальной диагностики',
// },
// {
//   name: 'Иванов Иван Иванович8',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Администрация',
// },
// {
//   name: 'Иванов Иван Сидорович9',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Отделение ИТ',
// },
// {
//   name: 'Иванов Петр Иванович10',
//   phone: '8 (904) 555-55-55',
//   Отделение: 'Отделение инструментальной диагностики',
// },
// ],