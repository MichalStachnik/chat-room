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

// import MockData from '../static/mock-data.json'

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
        url = `http://0.0.0.0:${port}`
      } else {
        url = 'http://localhost:3000'
      }
      console.log('our url - ', url)
      const { data } = await axios.get(`${url}/get-messages`)
      console.log('data from axios in asyncData', data)
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
    // this.MockData = MockData
    this.$store.dispatch('initData', this.MockData)
  }
}

</script>

<style>
  .chatroom {
    height: 100vh;
  }
</style>
