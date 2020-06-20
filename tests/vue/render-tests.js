const fs = require('fs')

// Step 1: Create a Vue instance
const Vue = require('vue')
Vue.component('t-s', {
    props: {
        statementId: Number
    },
    render: () => 'Statement',
    data () {
        console.log(this.statementId)
        return {}
    }
})
Vue.component('test-component', {
    template: `
    <section>
        <t-s :statement-id="0"></t-s><div></div>
        <t-s :statement-id="1"></t-s><br>
        <div
            v-if="false"
        >
            <t-s :statement-id="2"></t-s><a></a>
        </div>
        <t-s :statement-id="3"></t-s><b></b>
    </section>
    `
})
const app = new Vue({
  template: fs.readFileSync('./tests/vue/app.html', 'utf-8')
})

// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer()

// in 2.5.0+, returns a Promise if no callback is passed:
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})