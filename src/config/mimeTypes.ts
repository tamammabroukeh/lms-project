import powerPointIcon from "@/assets/img/png/powerpoint.png";
import defaultImage from "@/assets/img/png/default-image.png";
import excelIcon from "@/assets/img/png/excel.png";
import videoIcon from "@/assets/img/png/multimedia.png";
// import audioIcon from "@/assets/img/png/sound.png";
import audioIcon from "@/assets/img/png/audioIcon.png";
import fileIcon from "@/assets/img/png/file.png";
import wordIcon from "@/assets/img/png/word.png";
import pdfIcon from "@/assets/img/png/pdf.png";
import zipIcon from "@/assets/img/png/zip.png";
import accessIcon from "@/assets/img/svg/access.svg";
import TxtIcon from "@/assets/img/png/txt_icon.png";
const imageTypes = [
	"image/jpg",
	"image/jpeg",
	"image/jfif",
	"image/jif",
	"image/jpe",
	"image/pjp",
	"image/gif",
	"image/pjpeg",
	"image/gif",
	"image/png",
	"image/svg",
	"image/webp",
	"image/ico",
	"image/avif",
	"image/svg+xml",
	"image/tiff",
];
const fileTypes = [
	"message/rfc822",
	"text/plain",
	"application/vnd.ms-outlook",
	"application/vnd.oasis.opendocument.text",
	"application/vnd.apple.pages",
	"application/rtf",
	"text/plain",
	"application/wordperfect",
	"application/xml",
	"application/sql",
	"text/xml",
	"application/json",
	"text/html",
	"application/x-httpd-php",
	"application/javascript",
	"text/css",
	"text/javascript",
	"application/x-httpd-php",
	"application/xhtml+xml",
	"application/x-msdos-program",
	null,
];
const fileExcel = [
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"text/csv",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.openxmlformats-officedocument.spre",
];
const fileWord = [
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.ms-word",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.openxmlformats-officedocument.word",
];
const filePowerPoint = [
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const filePdf = ["application/pdf"];

const fileVideo = ["video/mp4", "video/quicktime", "video/mpeg", "video/x-ms-wmv", "video/webm"];
const fileAudio = ["/mpeg", "audio/wav", "audio/x-wav", "audio/mpeg"];
const fileZip = [
	"application/x-zip-compressed",
	"application/x-compressed",
	"application/vnd.rar",
	"application/zip",
	"application/octet-stream",
];

export {
	imageTypes,
	fileTypes,
	fileExcel,
	fileWord,
	filePowerPoint,
	filePdf,
	fileVideo,
	fileAudio,
	fileZip,
	defaultImage,
	powerPointIcon,
	excelIcon,
	videoIcon,
	audioIcon,
	fileIcon,
	wordIcon,
	pdfIcon,
	zipIcon,
	accessIcon,
	TxtIcon,
};
