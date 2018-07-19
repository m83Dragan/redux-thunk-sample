import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';


class App extends Component {
    componentDidMount(){
        const { PostActions, number } = this.props;
        PostActions.getPost(number);
    }
    componentWillReceiveProps(nextProps){
        const { PostActions } = this.props;
        if(this.props.number !== nextProps.number){
            PostActions.getPost(nextProps.number);
        }
    }
    render() {
        const { CounterActions, number, loading, error, data } = this.props;

        
        return (
            <div>
                <div>
                    <h1>{number}</h1>
                    <button onClick={CounterActions.incrementAsync}>+</button>
                    <button onClick={CounterActions.decrementAsync}>-</button>
                </div>
                <div>
                    {loading && <h1>Loading</h1>}
                    {error
                        ? <h1>Error</h1>
                        : (
                            <div>
                                <h1>{data.title}</h1>
                                <p>{data.body}</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        loading: state.post.pending,
        error: state.post.error,
        data: state.post.data
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);