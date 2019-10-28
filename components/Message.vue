<template>
  <div class="message-container">
    <div class="other-user">
      <img v-if="message.user !== 4" :src="require(`../assets/${getPic}.jpg`)" alt="user pic">
    </div>
    <div class="message" :class="{ 'is-user-message': message.user === 4 }">
      <div class="message-top">
        <div v-if="message.user !== 4" class="message-username">
          {{ getRealName }} - @{{ getUserName }}
        </div>
        <div class="message-time">
          {{ getDate }}
        </div>
      </div>
      <div class="message-body" :class="{ 'is-user': message.user === 4, flipped: this.isFlipped }" @click="handleRotate">
        <div class="message-front">{{ message.message }}</div>
        <div class="message-back">
          <img src="~/assets/calendar-icon.svg" alt="calendar-icon">
          <p>active since 1970</p>
        </div>
      </div>
    </div>
    <div class="local-user">
      <div v-if="message.user === 4" class="svg-container">
        <img src="~/assets/better-icon.svg" alt="better-icon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isFlipped: false
    }
  },
  methods: {
    handleRotate () {
      this.isFlipped = !this.isFlipped
    }
  },
  computed: {
    getDate () {
      const factor = this.message.user === 4 ? 1 : 1000
      const d = new Date(this.message.ts * factor)
      const dateArray = d.toString().split(' ')
      return `${dateArray[1]} ${dateArray[2]} ${dateArray[4]}`
    },
    getRealName () {
      const messageId = this.message.user
      const [user] = this.users.filter(user => messageId === user.id)
      return user.real_name
    },
    getUserName () {
      const messageId = this.message.user
      const [user] = this.users.filter(user => messageId === user.id)
      return user.username
    },
    getPic () {
      const messageId = this.message.user
      const [user] = this.users.filter(user => messageId === user.id)
      return `${user.username}`
    }
  }
}
</script>

<style scoped>
  .message-container {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    grid-column-gap: 10px;
    margin-bottom: 20px;
  }

  .other-user {
    display: flex;
    justify-content: flex-end;
  }

  .other-user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .svg-container {
    width: 50px;
    height: 50px;
    background: #291842;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .local-user img {
    width: 30px;
  }

  .message {
    color: #291842;
    width: 95%;
  }

  .is-user-message {
    place-self: end;
  }

  .message-top {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    font-size: 12px;
  }

  .message-body {
    position: relative;
    min-height: 50px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    background: #eee;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.4s all ease-in-out;
    transform-style: preserve-3d;
  }

  .message-body.flipped {
    transform: rotateY(180deg);
    background: #291842;
    color: #fff;
  }

  .message-front {
    backface-visibility: hidden;
  }

  .message-back {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    transform: rotateY(180deg);
  }

  .message-back p {
    margin-left: 10px;
  }

  .is-user {
    background: #00c397;
    color: #fff;
  }
</style>
