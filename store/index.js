import Vuex from 'vuex'

const createStore = () => {
  let mockId = 0
  return new Vuex.Store({
    state: {
      messages: [],
      users: []
    },
    mutations: {
      initData (state, data) {
        state.messages = data.posts
        state.users = data.users
      },
      addMessage (state, message) {
        const post = {
          id: mockId++,
          user: 4,
          message,
          ts: Date.now()
        }
        state.messages = [...state.messages, post]
      }
    },
    actions: {
      initData (vuexContext, data) {
        vuexContext.commit('initData', data)
      },
      addMessage (vuexContext, message) {
        vuexContext.commit('addMessage', message)
      }
    },
    getters: {
      messages (state) {
        return state.messages
      },
      users (state) {
        return state.users
      }
    }
  })
}

export default createStore
