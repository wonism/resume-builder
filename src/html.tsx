import React, { Component } from 'react';

const title = 'Resume Builder';
const author = 'Resume Builder';
const description = 'Build your resume';
const keywords = [
  'resume',
  'cv',
  'job',
].join(', ');

export default class HTML extends Component<any> {
  public render() {
    const {
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      body,
      postBodyComponents,
    } = this.props;

    return (
      <html {...htmlAttributes} lang="ko">
        <head>
          {headComponents}
          <title>
            {title}
          </title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="Access-Control-Allow-Origin" content="*" />
          <meta httpEquiv="Access-Control-Allow-Headers" content="*" />
          <meta httpEquiv="Access-Control-Expose-Headers" content="*" />
          <meta httpEquiv="Access-Control-Allow-Credentials" content="true" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover"
          />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://resume-builder.io" />
          {/* <meta property="og:image" content="" /> */}
          <meta property="og:description" content={description} />
          {/* <meta property="og:locale" content="ko_KR" /> */}
          <meta name="msapplication-TileImage" content="" />
          {/* <link rel="shortcut icon" href="" /> */}
          {/* <link rel="icon" type="image/png" sizes="16x16" href="" /> */}
          {/* <link rel="icon" type="image/png" sizes="32x32" href="" /> */}
          {/* <link rel="icon" type="image/png" sizes="48x48" href="" /> */}
          {/* <link rel="icon" type="image/png" sizes="196x196" href="" /> */}
          {/* <link rel="apple-touch-icon" type="image/png" sizes="57x57" href="" /> */}
          {/* <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="" /> */}
          {/* <link rel="apple-touch-icon" type="image/png" sizes="114x114" href="" /> */}
          {/* <link rel="apple-touch-icon" type="image/png" sizes="120x120" href="" /> */}
          {/* <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="" /> */}
          {/* <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="" /> */}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
          {postBodyComponents}
        </body>
      </html>
    );
  }
}
