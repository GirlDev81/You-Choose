import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './/video_detail';

const API_KEY = config.MY_KEY;


// Create new component - Produces some HTML///
class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo:null
    };

    this.videoSearch('music');
}

  videoSearch(term){
    YTSearch({key: API_KEY, term:term},(videos) => {
      this.setState({
        videos:videos,
        selectedVideo:videos[0]
     });
  });
}




  render(){

    const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 600);

      return (
        <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
        </div>
      );
  }
}

// Put created component's html and put on the page (the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
