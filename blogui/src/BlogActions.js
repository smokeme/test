import dispatcher from './BlogDispatcher';

const actions = {
  fetchArticles: () => {
    console.log("fetching ... ");
    const url = 'http://localhost:8000/api/articles.json';
    fetch(url).then(resp => {
      console.log(resp);
      if (resp.ok) {
        return resp.json();
      }
    }).then(json => {
      console.log(json);
      dispatcher.dispatch({
        type: 'blog-articles',
        value: json
      })
    })
  },
  updateDraft: (draft_key, draft_value) => {
    dispatcher.dispatch({
      type: 'update-draft',
      draft_key: draft_key,
      draft_value: draft_value
    })
  },
  submitDraft: (draft) => {
    console.log(draft);
    const url = "http://127.0.0.1:8000/api/articles/new/";
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(draft)
    }).then(function (res) {
      if(res.ok){
        actions.fetchArticles();
      } else {
        console.warn("fail!");
      }
    }).catch(function (res) {
      console.log(res)
    })
  }


};


export default actions;
