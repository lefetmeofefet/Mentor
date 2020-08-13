import HTMElement from "../../libs/htmelement/htmelement.js";
import "./x-icon.js"


customElements.define("x-loader", class extends HTMElement {
    render() {
        //language=HTML
        return this.html(this.props)`
                <style>
                    :host {
                        visibility: ${() => this.props.loading ? "unset": "hidden"};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #606060aa;
                        animation: fa-spin 2s linear infinite;
                        font-size: 30px;    
                        animation-name: ${() => this.props.loading ? "spin" : "none"};
                        animation-duration: 2000ms;
                        animation-iteration-count: infinite;
                        animation-timing-function: linear;
                    }
                </style>
                <x-icon icon="fas fa-spin fa-spinner"></x-icon>
        `
    }
});