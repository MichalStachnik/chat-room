<template>
  <div class="chatroom">
    <div>
      hi
      {{ tst }}
    </div>
    <MessageList />
    <ChatInput />
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
        url = `http://0.0.0.0:${port}/get-messages`
      } else {
        url = 'http://localhost:3000/get-messages'
      }
      console.log('our url - ', url)
      const { data } = await axios.get(url)
      console.log('data from axios in asyncData', data)
      return { tst: data.message, MockData: data.MockData }
    } catch (err) {
      console.warn(err)
    }
  },
  data () {
    return {
      MockData: {},
      tst: 'dataaaaa'
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
