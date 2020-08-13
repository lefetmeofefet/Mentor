import {HTMElement} from "./libs/htmel/htmel.min.js"
import state from "./state.js"
import "./src/components/x-button.js"
import "./src/welcome-page.js"
import "./src/student-signup.js"
import "./src/mentor-signup.js"

customElements.define("mentor-app", class extends HTMElement {
    render() {
        return this.html(this.props, this.state, state)`
<style>
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: inherit;
    }
    
</style>

${() => {
    if (state.isStudent === null) {
        return this.html()`<welcome-page></welcome-page>`
    } else {
        if (state.isStudent) {
            return this.html()`<student-signup></student-signup>`
        } else {
            return this.html()`<mentor-signup></mentor-signup>`
        }
    }
}}

`
    }
});