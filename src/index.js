// Javascript modules --> javascript ei pysty kommunikoimaan muiden javascript tiedostojen kanssa ellei luoda spesifistä yhteyttä (export ja import)
// React ydin kirjasto osaa pelata React-componentsien kanssa, kuinka renderöidä ne ja limittää yhteen
import React, { Component } from 'react';
// ReactDOM kirjasto sensijaan osaa renderöidä ne DOM:iin
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
// Voidaan importata SearchBar koska se on määritetty exportattavaksi
import SearchBar from './components/search_bar'; // omille importeille pitää tehdä tarkat polut

// Youtube api-key
const API_KEY = 'AIzaSyDHyqX_rLPUfGJWIsX5IrTpriyfObeLgo4';

YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
    console.log(data)
});

// Create a new component. This component should produce some HTML
class App extends Component  { //<-- Tämä on enemmänkin luokka josta luodaan elementtejä (ilmentymiä)
    render() {
        return (
            <div>
                <SearchBar />
            </div>
        )
    }
}

// Take this component's generated HTML and put it on the PAGE (in the DOM)
// ReactDOM.render(App); --> Tämä ei toimi sillä nyt DOM:iin yritettään renderöidä luokkaa
// ReactDOM.render(<App />); // Tämä toimii vähän paremmin sillä nyt luokasta App tehdään ilmentymä, mutta sitä ei käytetä mihinkään joten sekin antaa errorin
ReactDOM.render(<App />, document.querySelector('.container')); // Tämä toimii




//Huomioita!
// Jos tagiin ei laiteta mitään sisälle se voidaan itse-sulke esim <App />
// <div></div> --> React.createElement("div", null)
// Jos esim const App, siitä voidaan hakea ilmentymä laittamlla se  JSX-tägiin esim <App> </App> tai <App />
// const = ES6, sama kuin var mutta se on final eli se ei enää ikinä muutu
// Tehdään aina yksi komponentti per filu, ihan sama miten pieni se on.
// => eli fatArrown ero function lauseeseen on se että this on hieman erillainen sen sisällä (to be continued...)

//ES6 file is like a silo! You need to export and import stuff between files.

//Downwards data-flow --> Only the most parent component in application should be responsible for fetching data