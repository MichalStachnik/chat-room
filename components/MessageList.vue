<template>
  <div class="message-list">
    <Message
      v-for="(message, index) in computedMessages"
      :key="index"
      :message="message"
      :users="users"
    />
  </div>
</template>

<script>
import Message from '@/components/Message'

export default {
  name: 'MessageList',
  components: {
    Message
  },
  data () {
    return {
      users: []
    }
  },
  computed: {
    computedMessages () {
      return this.$store.getters.messages
    }
  },
  created () {
    this.users = this.$store.getters.users
  }
}
</script>

<style>
.message-list {
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
