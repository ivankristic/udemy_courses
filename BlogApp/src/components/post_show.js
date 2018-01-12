import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from "../actions/index";

class PostShow extends Component {
    componentDidMount(){
        this.props.fetchPost(this.props.match.params.id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // const { post } = this.props;
        const post = this.props.posts;

        if (post === undefined) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">&lt;- Back to index /</Link>
                <button className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{ post.title }</h3>
                <h6>Categories: { post.categories }</h6>
                <p>{ post.content }</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { posts: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
