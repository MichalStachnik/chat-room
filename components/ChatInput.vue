<template>
  <form class="chat-form" @submit.prevent="sendMessage">
    <div>
      <span class="chars-left">{{ getCharsLeft }}</span>
      <input v-model="message" class="message" type="text" placeholder="what's happening?">
      <!-- <textarea v-model="message" class="message" placeholder="what's happening?"></textarea> -->
      <span class="plane-container" @click="sendMessage">
        <i class="material-icons">send</i>
      </span>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatInput',
  data () {
    return {
      message: '',
      charsLeft: 140
    }
  },
  computed: {
    getCharsLeft () {
      return this.charsLeft - this.message.length
    }
  },
  methods: {
    sendMessage () {
      console.log('send message fired')
      if (this.message.length === 0 || this.getCharsLeft <= 0) {
        return
      }
      axios.post('http://localhost:3000/send-message', { message: this.message })
        .then((res) => {
          console.log('res from server', res)
          this.$store.dispatch('addMessage', this.message)
          this.message = ''
        })
        .catch(err => console.warn(err))
    }
  },
  watch: {
    message (newMessage, oldMessage) {
      if (newMessage.length > 140) {
        this.message = newMessage.substr(0, 140)
      }
    }
  }
}

</script>

<style scoped>
  .chat-form {
    height: 60px;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  div {
    height: 100%;
  }
  .message {
    height: 100%;
    width: 100%;
    padding: 0 50px;
    border: 0;
    border-top: 2px solid #00c397;
    color: #291842;
    outline: none;
    font-size: 14px;
  }
  .chars-left {
    position: absolute;
    top: 25px;
    left: 10px;
    color: #b1b1b1;
    font-size: 12px;
  }
  .plane-container {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #b1b1b1;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
  }
  .plane-container:hover {
    color: #00c397;
  }

</style>
