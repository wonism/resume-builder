import { Helmet } from 'react-helmet';

export { default as wrapPageElement } from './src/components/Layouts';

export const onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
) => {
  const helmet = Helmet.renderStatic();

  setHtmlAttributes(helmet.htmlAttributes.toComponent());
  setBodyAttributes(helmet.bodyAttributes.toComponent());

  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ]);
};
