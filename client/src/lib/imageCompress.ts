/**
 * Kompreson dhe ndryshon madhësinë e një fotoje në browser, para upload-it.
 * Redukton madhësinë e skedarit ndjeshëm pa humbje të dukshme cilësie.
 */
export async function compressImage(file: File, maxWidth = 1600, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context nuk u krijua"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Kompresimi dështoi"));
            return;
          }
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, ".jpg"),
            { type: "image/jpeg" }
          );
          resolve(compressedFile);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => reject(new Error("Foto nuk u ngarkua për kompresim"));
    reader.onerror = () => reject(new Error("Leximi i skedarit dështoi"));
    reader.readAsDataURL(file);
  });
}