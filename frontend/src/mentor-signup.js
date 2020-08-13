import {HTMElement} from "../libs/htmel/htmel.min.js"
import "./components/x-button.js"

customElements.define("mentor-signup", class extends HTMElement {
    render() {
        return this.html(this.props, this.state)`
<style>
    :host {
        display: flex;
    }
    
</style>
I AM MENTOR PAGE
`
    }
});