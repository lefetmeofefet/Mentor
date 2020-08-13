import {HTMElement} from "../libs/htmel/htmel.min.js"
import "./components/x-button.js"
import "./components/text-input.js"
import state from "../state.js";

customElements.define("student-signup", class extends HTMElement {
    render() {
        return this.html(this.props, this.state, state)`
<style>
    :host {
        height: inherit;
        /*width: 100%;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 500px;
    }
    
    #search-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    /* SCROLLBAR */
    ::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #00000000;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        background-color: #00000000;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: #00000040;
        border-radius: 100px;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background-color: #00000060;
    }
    
    #search-field {
        
    }
    
    #learn-options {
        display: flex;
        overflow-x: auto;
    }
    
    #learn-options > .option {
        padding: 5px 8px;
        background-color: #5679dd;
        min-width: 100px;
    }
    
    #results-container {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    
    #results-container > .posting {
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        margin: 5px;
        background-color: #00000010;
        border-radius: 7px;
    }
    
    #results-container > .posting > .name {
        font-weight: bold;
    }
    
    #results-container > .posting > .info {
        color: #000000bb;
    }
    
</style>

<div id="search-container">
    <text-input id="search-field" placeholder="What would you like to learn?"></text-input>
    <div id="learn-options">
        ${() => state.subjects.map(
            subject => this.html()`
<x-button class="option" onclick=${() => this.subjectClicked(subject)}>
    ${() => subject}
</x-button>`
        )}
    </div>
</div>

<div id="results-container">
    ${() => state.selectedSubject != null && state.postings[state.selectedSubject].map(mentor => {
        return this.html()`
<div class="posting">
    <div class="name">${mentor}</div>
    <div class="info">age: ${() => state.mentors[mentor].age}</div>
    <div class="info">address: ${() => state.mentors[mentor].street}</div>
    <div class="info">phone: ${() => state.mentors[mentor].phone}</div>
</div>
`
    })}
</div>

`
    }

    subjectClicked(subject) {
        console.log("Selected subject: ", subject, state.postings[subject])
        this.shadowRoot.querySelector("#search-field").value = subject;
        state.selectedSubject = subject;
    }
});