import { ResumeBody } from '@models/resume';
import defaultCreation from './creation/default';

export const generatePdf = (body: ResumeBody) => new Promise<any>((resolve) => {
  switch (body.type) {
    default:
      defaultCreation(body).getBlob(resolve);
      break;
  }
});
