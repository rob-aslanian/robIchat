/* eslint-disable no-mixed-spaces-and-tabs */
import Vuex from "vuex";
import Vue from "vue";
import db from "../firebase/init";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {},
    users: 0,
    usersMessagesCount: 0,
    userMessagesCount: 0,
    usersInChat: 0
  },
  actions: {
    setUser(context) {
      context.commit("setUser");
    },
    setAllMessages(context) {
      context.commit("getAllUsersMessages");
    },
    setUserMessages(context) {
      context.commit("getUserMessages");
    },
    setUsersInChat(context) {
      context.commit("getUsersInChat");
    },
    setUsers(context) {
      context.commit("getAllUsers");
    },
    getAllInfo(context) {
      context.commit("getAllUsersMessages");
      context.commit("getUserMessages");
      context.commit("getUsersInChat");
      context.commit("getAllUsers");
    }
  },
  mutations: {
    setUser(state) {
      let name = document.cookie.split("=")[1];
      db.collection("users")
        .doc(name)
        .get()
        .then(el => {
          let userInfo = {
            login_name: el.id,
            user_name: el.data().user_name,
            permission: el.data().permission,
            gender: el.data().sex
          };
          return (state.userInfo = userInfo);
        });
    },
    /** Request for all users messages  */
    getAllUsersMessages(state) {
      db.collection("messages")
        .get()
        .then(data => {
          if (!data.empty) {
            let all = [];
            data.forEach(el => all.push(el.ref.id));
            return (state.usersMessagesCount = all.length);
          }
        });
    },

    /** Request for current user  */
    getUserMessages(state) {
      db.collection("messages")
        .get()
        .then(data => {
          let curent = [];
          data.forEach(el => {
            if (el.data().name == state.userInfo.user_name)
              return curent.push(this.name);
          });
          return (state.userMessagesCount = curent.length);
        });
    },
    /** Request for all users which is in chat  */
    getUsersInChat(state) {
      db.collection("messages")
        .get()
        .then(data => {
          let users = [];
          data.forEach(el => users.push(el.data().name));
          /** Make array unique */
          users = users.filter((el, index, arr) => arr.indexOf(el) == index);

          return (state.usersInChat = users.length);
        });
    },
    /* Request for all users */
    getAllUsers(state) {
      db.collection("users")
        .get()
        .then(data => {
          let users = [];
          if (!data.empty) data.forEach(el => users.push(el.id));
          return (state.users = users.length);
        });
    }
  },

  getters: {
    getUser: state => state.userInfo,
    getUsersMessages: state => state.usersMessagesCount,
    getUserMessages: state => state.userMessagesCount,
    getUsersInChat: state => state.usersInChat,
    getUsers: state => state.users
  }
});

export default store;
