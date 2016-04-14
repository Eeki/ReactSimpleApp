// Javascript modules --> javascript ei pysty kommunikoimaan muiden javascript tiedostojen kanssa ellei luoda spesifistä yhteyttä (export ja import)
// React ydin kirjasto osaa pelata React-componentsien kanssa, kuinka renderöidä ne ja limittää yhteen
import _ from 'lodash'; // Loadas merkataan yleensä _
import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // ReactDOM kirjasto sensijaan osaa renderöidä ne DOM:iin
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; // omille importeille pitää tehdä tarkat polut
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import { API_KEY } from './config';

class App extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        console.log(API_KEY);
        return (
            <div>
                <SearchBar  onSearchTermChange={videoSearch}/>
                <VideoDetail  video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it on the PAGE (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));




//Huomioita!
// Jos tagiin ei laiteta mitään sisälle se voidaan itse-sulke esim <App />
// <div></div> --> React.createElement("div", null)
// Jos esim const App, siitä voidaan hakea ilmentymä laittamlla se  JSX-tägiin esim <App> </App> tai <App />
// const = ES6, sama kuin var mutta se on final eli se ei enää ikinä muutu
// Tehdään aina yksi komponentti per filu, ihan sama miten pieni se on.
// => eli fatArrown ero function lauseeseen on se että this on hieman erillainen sen sisällä (to be continued...)

//ES6 file is like a silo! You need to export and import stuff between files.
//ES6: (data) = > foo = {data: data} on sama asia kuin (data) => foo = {data}
//Downwards data-flow --> Only the most parent component in application should be responsible for fetching data
// Component should produce some HTML

//Luokan ilmentymiä tehdään <Luokka />

// ReactDOM.render(App); --> Tämä ei toimi sillä nyt DOM:iin yritettään renderöidä luokkaa
// ReactDOM.render(<App />); // Tämä toimii vähän paremmin sillä nyt luokasta App tehdään ilmentymä, mutta sitä ei käytetä mihinkään joten sekin antaa errorin