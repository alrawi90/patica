import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './components/Main.js';import Show from './components/Show.js';


ReactDOM.render((
	<x>
	 <BrowserRouter>          
	   <Route path="/show/:id" component={Show}/>
	 </BrowserRouter>

     <BrowserRouter>
          
          <Route path='/' render={routeProps => <Main {...routeProps} />} />

     </BrowserRouter>
     </x>
     ),
     document.getElementById('main')
);

// ReactDOM.render((
//   <Router history={hashHistory}>
//     <Route path="/:language" component={Main}/>
//   </Router>
// ), document.getElementById('main'))

// ReactDOM.render(

// <Router history={hashHistory} >
// 	<Route path="/" component={Main} > 
//       <IndexRoute component={Main} ></IndexRoute>
// 	</Route>

// </Router>


// 	, document.getElementById('main'));



