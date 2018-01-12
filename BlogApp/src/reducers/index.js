import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import PostsReducer from './posts_reducer';

const rootReducer = combineReducers({
    posts: PostsReducer,
    form: FormReducer
});

export default rootReducer;
