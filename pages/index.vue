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

import ChatInput from '@/components/ChatInput'
import MessageList from '@/components/MessageList'

export default {
  components: {
    ChatInput,
    MessageList
  },
  async asyncData (context) {
    const { data } = await axios.get('http://localhost:3000/get-messages')
    console.log('data from axios in asyncData', data)
    return { tst: data.message, MockData: data.MockData }
  },
  data () {
    return {
      MockData: {},
      tst: 'dataaaaa'
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
