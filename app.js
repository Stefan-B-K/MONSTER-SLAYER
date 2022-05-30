function randomHealth (min, max) {
  return Math.floor((Math.random() * (max - min) + min))
}

const app = Vue.createApp({
  data () {
    return {
      playerHealth: 100,
      playerHealthMax: 100,
      monsterHealth: 200,
      monsterHealthMax: 200,
      currentRound: 0,
      winner: null
    }
  },
  watch: {
    playerHealth (value) {
      if (value <= 0 && this.monsterHealth <= 0) this.winner = 'draw'
      else if (value <= 0) this.winner = 'monster'
    },
    monsterHealth (value) {
      if (value <= 0 && this.playerHealth <= 0) this.winner = 'draw'
      else if (value <= 0) this.winner = 'player'
    }
  },
  computed: {
    playerHealthBar () {
      if (this.playerHealth())
      return this.playerHealth / this.playerHealthMax * 100 + '%'
    },
    monsterHealthBar () {
      return this.monsterHealth / this.monsterHealthMax * 100 + '%'
    },
    specialAttackDisabled () {
      return this.currentRound % 3 !== 0
    }
  },
  methods: {
    attackMonster () {
      this.currentRound++
      const attackValue = randomHealth(8, 20)
      this.monsterHealth -= attackValue
      this.attackPlayer()
    },
    specialAttackMonster () {
      this.currentRound++
      const attackValue = randomHealth(20, 35)
      this.monsterHealth -= attackValue
      this.attackPlayer()
    },
    attackPlayer () {
      const attackValue = randomHealth(8, 20)
      this.playerHealth -= attackValue
    },
    healPlayer () {
      this.currentRound++
      const healValue = randomHealth(10, 20)
      if (this.playerHealth + healValue < 100) this.playerHealth += healValue
      else this.playerHealth = 100
      this.attackPlayer()
    }
  }
})

app.mount('#game')

