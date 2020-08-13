import {HTMElement} from "../libs/htmel/htmel.min.js"
import state from "../state.js"
import "./components/x-button.js"

customElements.define("welcome-page", class extends HTMElement {
    render() {
        return this.html(this.props, this.state)`
<style>
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: inherit;
    }
    
    #title {
        font-size: 40px;
    }
    
    #choose-box {
        display: flex;
        margin-top: 20px;
    }
    
    .selection-button {
        padding: 0;
        margin: 10px;
        background-repeat:no-repeat;
        background-position: center center;
    }
    
    .selection-button > div {
        font-size: 30px;
        padding: 70px 35px;
        background-color: #00000030;
        font-weight: bold;
    }
    
    #student-button {
        background-image: url("../res/student.jpg");
    }
    
    #mentor-button {
        background-image: url("../res/teacher.jpg");
    }
</style>

<div id="title">Welcome to Mentor!</div>
<div id="choose-box">
    <x-button class="selection-button" id="student-button"
              onclick=${() => state.isStudent = true}>
        <div>I'm a Student</div>
    </x-button>
    <x-button class="selection-button" id="mentor-button"
              onclick=${() => state.isStudent = false}>
        <div>I'm a Mentor</div>
    </x-button>
</div>
`
    }
});