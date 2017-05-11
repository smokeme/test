import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


function ShortArticle({article}) {
  return <div style={{display: "inline-block", width: '50%', verticalAlign: "top", boxSizing: "border-box"}}>
    <h1>{article.title}</h1>
    <p>{article.body.substr(0, 100).replace(/\s\S*$/)} ...</p>
    <Link to={"/article/" + article.id}>Read more ...</Link>
  </div>
}
function LongArticle({article}) {
  return <div style={{display: "block", width: '100%', verticalAlign: "top", boxSizing: "border-box"}}>
    <h1>{article.title}</h1>
    <img src={article.image} style={{width: '30%', float: 'right'}} alt={article.title}/>
    {article.body.split("\n").map((text, i) => <p key={i}>{text}</p>)}
  </div>
}

function Article({article}) {
  return <Switch>
    <Route exact path={"/article/" + article.id} render={() => <LongArticle article={article}/>}/>
    <Route render={() => <ShortArticle article={article}/>}/>
  </Switch>
}

function Form({draft, updateDraft, submitDraft}) {
  return <div className="inpform">
    <input type="text" value={draft.title} className="inp" placeholder="Title"
           onChange={e => updateDraft('title', e.target.value)}/>
    <input type="text" value={draft.image} className="inp" placeholder="Image URL"
           onChange={e => updateDraft('image', e.target.value)}/>
    <textarea cols={80} rows={10} className="inp" placeholder="Article Body" value={draft.body}
              onChange={e => updateDraft('body', e.target.value)}/>
    <input type="text" value={draft.username} className="inp" placeholder="Username"
           onChange={e => updateDraft('username', e.target.value)}/>
    <input type="password" value={draft.password} className="inp" placeholder="Password"
           onChange={e => updateDraft('password', e.target.value)}/>
    <input type="submit" className="inp" value="Submit" onClick={() => submitDraft(draft)}/>
  </div>
}

function Draft({draft, updateDraft, submitDraft}) {
  return <div>
    <Form draft={draft} updateDraft={updateDraft} submitDraft={submitDraft}/>
    <div className="inpform">
      <LongArticle article={draft}/>
    </div>
  </div>
}

function ArticlesList({articles}) {
  return <div style={{textAlign: 'left', padding: 10}}>
    {articles.map(article => <Article key={article.id} article={article}/>)}
  </div>
}

function App({articles, draft, updateDraft, submitDraft}) {
  return <Router>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Welcome to my blog.</h2>
      </div>
      <Link to="/article/new">Create a new article</Link>
      <Switch>
        <Route exact path="/article/new" render={() =>
          <Draft draft={draft.toObject()}
                 updateDraft={updateDraft}
                 submitDraft={submitDraft}
          />}/>
        <Route render={() => <ArticlesList articles={articles}/> }/>
      </Switch>
    </div>
  </Router>;
}

export default App;
