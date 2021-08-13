import QRCode from "qrcode";

export default function generateQR(url) {
  let qrLink;

  QRCode.toDataURL(url, function (err, url) {
    qrLink = url;
  });

  return qrLink;
}
