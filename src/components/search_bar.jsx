import React, { Component} from 'react'; // Tarkoittaa impoort React ja ota sieltä muuttuja Component käyttöön


// Huom voisi olla myös  --> class SearchBar extends React.Component { ...
class SearchBar extends Component { // Luokka SearchBar perii Reakt.Componenltilta funktionallisuutta
    constructor(props) {
        super(props);

        this.state = {term: ''}; // Alustetaan State. Voi käyttää mitä nimiä tahtoo. Konstruktorissa on ainoa kerta kun muutetaan Statea tyyliin this.state = olio. Muualla komponentissa käytetään this.setState(olio) metodia
    }

    render() { //Luokkan SearchBar metodi "render"
        return(
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar; //Tekee SearchBar:in exportattavaksi


// HUOMIOITAVAA
// "Ylennettiin kommentoitu funktio pohjainen SearchBar olio täydeksi luokkapohjaiseksi React.Component:in periväksi luokka pohjaiseksi olioksi, koska se piti saad atietoiseksi omasta tilastaan ja sille piti lisätä funktionaalisuutta"
// Yleisohje milloin käyttää funktiopohjaista Component:ia ja milloin Class pohjaista on : Aloita ensin funktiosta ja jos pitää saada lisää funktionaalisuutta niin refaktoroi luokka componentiksi

//Staten määritelmä
//State is a plain javascript object that is used to record and react to user events. Each class based component has its own state object. when component state changes the component immediately re-renders and also forces all of its children re-render
//Only Class based components have states, function based components won't have state

//ES6 fat-arrow treeniä
//onChange onChange={(event) => ... on sama kun alla oleva kommentoitu koodi
/*onInputChange(event) {
 console.log(event.target.value);
 }*/

//SearchBar funktio-muodossa
/*const SearchBar = () => {
 return <input />; // Muuttuu React.createElement kutsuksi joten pitää kutsua importata React
 };*/

//this.sate.term = event.target.value   <-- BAD!!!!!
//this.setState({ term: event.target.value })} <-- GOOD!!!

//Tyylillä this.state.term voidaan kyllä referoida stateen, kunhan sitä ei muuteta  <-- OK!

//Controlled component or Controlled field or controlled form element --> value is set by the state esim. SearchBar:in <input> elementistä tulee kontrolloitu, sillä sen value={this.state.term}

//Jokaisella luokalle joka perii Rect.Componentin pitää olla render metodi, joka palauttaa jsx:ää, muuten päädytään erroriin

//ES6 opittu
// - luokat (Class)
// - import ja export
// - arrow function
// - const