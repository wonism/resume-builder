export const fileToBase64 = (file: File | Blob) => new Promise<string>((resolve, reject) => {
  console.log(file);
  const reader = new FileReader();

  reader.onload = () => {
    console.log(reader.result);
    resolve(reader.result as string);
  };
  reader.onerror = error => reject(error);

  reader.readAsDataURL(file);
});

export const downloadFile = (file: File | Blob) => {
  const blob = new Blob([file], { type: 'octet/stream' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');

  document.body.appendChild(a);
  a.href = url;
  a.download = 'resume.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
};
