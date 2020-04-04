import { saveAs } from 'file-saver';

export const fileToBase64 = (file: File | Blob) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => {
    resolve(reader.result as string);
  };
  reader.onerror = error => reject(error);

  reader.readAsDataURL(file);
});

export const downloadFile = (file: File | Blob) => {
  const blob = new Blob([file], { type: 'octet/stream' });

  saveAs(blob, 'resume.pdf');
};
