import HTMElement from "../../libs/htmelement/htmelement.js";
import "./x-button.js"


customElements.define("x-switch", class extends HTMElement {
    constructor() {
        super({});

        if (window.IOS) {
            // this.onmouseup = () => this.dispatchEvent(new Event('click'));
            this.onmouseup = e => this.props.switched && this.props.switched(e);
        } else {
            this.onclick = e => this.props.switched && this.props.switched(e)
        }
    }

    render() {
        //language=HTML
        return this.html(this.props, this.state)`
                <style>
                    :host {
                        display: flex;
                        align-items: center;
                        --circle-size: 25px;
                        --circle-margin: 3px;
                        height: calc(var(--circle-size) + var(--circle-margin) * 2 + 1px)
                    }
                    
                    #text {
                        font-size: inherit;
                        margin-right: 15px;
                    }
                    
                    #switch-container {
                        position: relative;
                        border-radius: 100px;
                        background-color: #00000030;
                        padding: 0;
                        height: calc(var(--circle-size) + (var(--circle-margin) * 2));
                        width: calc((var(--circle-size) + (var(--circle-margin) * 2)) * 2);
                    }
                    
                    #circle {
                        position: absolute;
                        background-color: #eeeeee;
                        border-radius: 100px;
                        transition: 0.3s;
                        top: var(--circle-margin);
                        left: var(--circle-margin);
                        width: var(--circle-size);
                        height: var(--circle-size);
                    }
                    
                    #circle[is-on] {
                        margin-right: var(--circle-margin);
                        margin-left: auto;
                        left: calc(var(--circle-margin) * 3 + var(--circle-size));
                    }
                    
                    #switch-container[is-on] {
                        background-color: rgb(83, 62, 30);
                    }
                </style>
                
                <div id="text">
                    <slot></slot>
                </div>
                <x-button id="switch-container" is-on="${() => this.props.value}">
                    <div id="circle" is-on="${() => this.props.value}"></div>
                </x-button>
        `
    }
});