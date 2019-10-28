<template>
  <div class="chatroom">
    <div>
      {{ url }}
    </div>
    <MessageList />
    <ChatInput :url="url" />
  </div>
</template>

<script>
import axios from 'axios'

import ChatInput from '@/components/ChatInput'
import MessageList from '@/components/MessageList'

export default {
  components: {
    ChatInput,
    MessageList
  },
  async asyncData (context) {
    try {
      const port = process.env.PORT
      let url = ''
      if (port) {
        // url = `http://0.0.0.0:${port}`
        url = `https://better-server-side.herokuapp.com`
      } else {
        url = 'http://localhost:3000'
      }
      const { data } = await axios.get(`${url}/get-messages`)

      url = port ? 'https://better-server-side.herokuapp.com/send-message' : 'http://localhost:3000'
      return { url, MockData: data.MockData }
    } catch (err) {
      console.warn(err)
    }
  },
  data () {
    return {
      MockData: {},
      url: ''
    }
  },
  created () {
    this.$store.dispatch('initData', this.MockData)
  }
}

</script>

<style>
  .chatroom {
    height: 100vh;
  }
</style>
