/**
 * A drop-in component to listen for resizes or scroll-bar show/hide
 *
 * Based on https://gist.github.com/AdamMcCormick/d5f718d2e9569acdf7def25e8266bb2a
 */

import React from 'react'

class ScrollBarAdapter extends React.Component{
    onResize = () => {
        if (this.props.onResize) {
            this.props.onResize();
            return;
        }
        try {
          var evt = new UIEvent('resize');
          window.dispatchEvent(evt);
        } catch(e) {}
    }

    componentDidMount() {
        this.refs.frame.contentWindow.addEventListener('resize', this.onResize, false);
    }
    componentWillUnmount() {
        this.refs.frame.contentWindow.removeEventListener('resize', this.onResize);
    }
    render(){
        var styles = {
            height: 0,
            margin: 0,
            padding: 0,
            overflow: "hidden",
            borderWidth: 0,
            position: "absolute",
            backgroundColor: "transparent",
            width: "100%"
        };
        return (
            <iframe className="ScrollBarAdapter" ref="frame" style={styles} />
        );
    }
};

export default ScrollBarAdapter;