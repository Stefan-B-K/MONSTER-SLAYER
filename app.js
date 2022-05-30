function randomAttack(min, max) {
  return Math.floor((Math.random() * (max - min) + min))
}

const app = Vue.createApp({
  data () {
    return {
      playerHealth: 100,
      playerHealthMax: 100,
      monsterHealth: 200,
      monsterHealthMax: 200,
    }
  },
  watch: {},
  computed: {
    playerHealthBar() {
      return this.playerHealth / this.playerHealthMax * 100 + '%'
    },
    monsterHealthBar() {
      return this.monsterHealth / this.monsterHealthMax * 100 + '%'
    },
  },
  methods: {
    attackMonster () {
      const attackValue = randomAttack(5, 12)
      this.monsterHealth -= attackValue
      this.attackPlayer()
    },
    attackPlayer () {
      const attackValue = randomAttack(8, 16)
      this.playerHealth -= attackValue
    }
  }
})

app.mount('#game')

