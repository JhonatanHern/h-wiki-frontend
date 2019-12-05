import React from 'react'
import './App.css'
import Card from './Card'

class CardNode extends React.Component {
    state = {
        next: null,
        fetchedContent: null
    }
    constructor(props){
        super(props)
        console.log('card content on constructor: ',this.props.content)
        fetch('/graphql',{
            method: 'POST',
            Accept: 'api_version=2',
            headers:{ 'Content-Type' : 'application/graphql' },
            body: `{getPage(pageId:"${this.props.content}"){title,content}}`,
        })
        .then( r => r.json() )
        .then( data => {
            this.setState({ fetchedContent: data })
        })
    }
    componentDidUpdate(prevProps){
        if ( prevProps.content !== this.props.content ) {
            this.setState({
                next: null
            })
            fetch('/graphql',{
                method: 'POST',
                Accept: 'api_version=2',
                headers:{ 'Content-Type' : 'application/graphql' },
                body: `{getPage(pageId:"${this.props.content}"){title,content}}`,
            })
            .then( r => r.json() )
            .then( data => {
                this.setState({ fetchedContent: data })
            })
        }
    }
    handleClick = e => {
        if (e.target && e.target.href && /\/\$\w*$/.test(e.target.href) ) {
            e.preventDefault()
            console.log('matching link clicked: ',e.target.href)
            let splittedLink = e.target.href.split('/')
            let key = splittedLink[ splittedLink.length - 1 ]
            console.log('key: ', key)
            this.setState({next: key})
        }
    }
    render() {
        return (
            <>
                {
                    <Card content={ this.state.fetchedContent || 'Loading...' } onClick={this.handleClick}/>
                }
                {
                    this.state.next &&
                    <CardNode content={this.state.next} />
                }
            </>
        );
    }
}

export default CardNode
 