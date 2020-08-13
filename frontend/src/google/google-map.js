import {HTMElement} from "../../libs/htmel/htmel.min.js"

customElements.define("google-map", class extends HTMElement {
    render() {
        return this.html(this.props, this.state)`<div>fucku</div>`
    }
});