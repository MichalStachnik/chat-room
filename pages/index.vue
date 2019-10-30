<template>
  <div class="chatroom">
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
      const url = process.env.PORT ? 'https://better-server-side.herokuapp.com' : 'http://localhost:3000'
      const { data } = await axios.get(`${url}/get-messages`)

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
    width: 100vw;
  }
</style>
