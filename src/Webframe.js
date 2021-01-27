import React, { PureComponent, useEffect } from 'react';

function loadFrame(link) {
    fetch(`http://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
    .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
    })
    .then(data => {
        var html = data.contents.replace("<head>", "<head><base href='https://www.amazon.com/' target='_blank'>");
        html = html.replace('target="_top"', 'target="_blank"');
        var iframe = document.getElementById('my-iframe');
        var doc = iframe.document;

        if (iframe.contentDocument) {
            doc = iframe.contentDocument;
        } else if (iframe.contentWindow) {
            doc = iframe.contentWindow.document;
        }
        doc.open();
        doc.writeln(html);
        doc.close();
    });
}

export default function Webframe(link) {
    useEffect(() => {
        loadFrame(link);
    }, [link]);
    return (
        <iframe sandbox="allow-same-origin allow-scripts allow-popups"
         id="my-iframe" style={{width: '166%', 
         height: '300vh', display: "block", zoom: 0.6,
         '-moz-transform': 'scale(0.6)',
         '-moz-transform-origin': '0 0',
         '-o-transform': 'scale(0.6)',
         '-o-transform-origin': '0 0',
         '-webkit-transform': 'scale(0.6)',
         '-webkit-transform-origin': '0 0'}}></iframe>
    );
}
