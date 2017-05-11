import {ReduceStore} from 'flux/utils';
import dispatcher from './BlogDispatcher';
import {Map} from "immutable";

class BlogStore extends ReduceStore {
  getInitialState() {
    return Map({
      articles: [],
      draft: Map({
        title: "new title from react",
        body: "new body from react",
        image: "https://lh3.googleusercontent.com/Gz_zy9kgrXCouwkhFVIts0PH1rFjZ1hMX_kzF6AUCJ0zPHKpvGM3vSWTinqXg7fR-jNHoIKc=s640-h400-e365-rw",
        username: "aziz",
        password: "test1234"
      })
    });
  }

  reduce(state, action) {
    console.log(action);
    if (action.type === 'blog-articles') {
      return state.set('articles', action.value);
    } else if(action.type === 'update-draft'){
      // example_action = {
      //   type: 'update-draft',
      //   draft_key: 'title',
      //   draft_value: 'my new title'
      // };
      return state.setIn(['draft', action.draft_key], action.draft_value);
    }
    return state;
  }
}

export default new BlogStore(dispatcher);