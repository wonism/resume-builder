import 'focus-visible';
import { globalHistory } from '@reach/router';
import { pdfjs } from 'react-pdf';

export { default as wrapPageElement } from './src/components/Layouts';

export const onInitialClientRender = () => {
  let currentPath = document.location.pathname.replace(/\/$/, '');

  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  globalHistory._onTransitionComplete();
  globalHistory.listen(({ location, action }) => {
    if (action !== 'PUSH') {
      return;
    }

    const newPath = location.pathname.replace(/\/$/, '');

    if (currentPath === newPath) {
      document.location.reload();
    } else {
      currentPath = newPath;
    }
  });
};
