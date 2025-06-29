// import styles from "./FileUploader.module.css";More actions
// import {
// 	imageTypes,
// 	fileTypes,
// 	fileExcel,
// 	fileWord,
// 	filePowerPoint,
// 	filePdf,
// 	fileVideo,
// 	fileAudio,
// 	fileZip,
// 	powerPointIcon,
// 	excelIcon,
// 	videoIcon,
// 	audioIcon,
// 	fileIcon,
// 	wordIcon,
// 	pdfIcon,
// 	zipIcon,
// 	defaultImage,
// } from "@/config/mimeTypes";
// import RFlex from "@/components/Reusable-Components/Reusable-Flex";
// import { formatFileSize } from "@/utils/formatFileSize";
// import { CircleCheck, Pause, Play } from "lucide-react";
// import { IFilesList } from "@/interfaces/FileUploader";

// const FilesList = ({ files, pausedFiles, progress, removeFile, pauseFile, resumeFile }:IFilesList) => {
// 	const thumbs = files?.map((fileObj, index) => {
// 		// console.log("fileObj 123", fileObj, pausedFiles);

// 		const type = fileObj.mimeType ?? "";
// 		const fileName = fileObj?.file?.name ?? fileObj?.name;
// 		const fileSize = fileObj?.file?.size;
// 		const uploadId = fileObj.uploadId ?? "id";

// 		// Determine file source for preview
// 		const fSource =
// 			type == "image/tiff"
// 				? defaultImage
// 				: imageTypes.includes(type)
// 				? fileObj.url 
// 				:fileTypes.includes(type)
// 				? fileIcon
// 				: fileWord.includes(type)
// 				? wordIcon
// 				: fileExcel.includes(type)
// 				? excelIcon
// 				: filePowerPoint.includes(type)
// 				? powerPointIcon
// 				: filePdf.includes(type)
// 				? pdfIcon
// 				: fileVideo.includes(type)
// 				? videoIcon
// 				: fileAudio.includes(type)
// 				? audioIcon
// 				: fileZip.includes(type)
// 				? zipIcon
// 				: fileIcon;

// 		// Get progress details for this file
// 		const fileProgress = progress[uploadId] ?? {}; // Default to an empty object
// 		const { progress: percentage = 0, uploaded = 0, total = fileSize, errorMessage, isSuccess } = fileProgress;
// 		const isPaused = pausedFiles?.uploadId || false;

// 		// Progress bar color
// 		const timerProgressColor = percentage === 100 && isSuccess ? "bg-themeSuccess" : "bg-themePrimary";
// 		console.log("uploadId", uploadId);
// 		return (
// 			<div
// 				key={index}
// 				className="flex gap-[15px] items-center h-[90px] rounded-[8px] p-[8px]"
// 				style={{ boxShadow: "0px 4px 16px #00000024" }}
// 			>
// 				<div className={styles.image__container}>
// 					<img className={styles.image__content} src={fSource} alt={fileName} />

// 					{/* Show progress overlay if not complete */}
// 					{/* {!fileObj?.url && percentage !== 100 && (
//                         <div className={styles.progress}>
//                             <div className="progress-bar">
//                                 {percentage}%
//                             </div>
//                         </div>
//                     )} */}
// 				</div>
// 				<RFlex classes="gap-0 flex-col w-full">
// 					<RFlex classes="justify-between">
// 						<div className="font-bold">
// 							{/* {fileName} */}
// 							{fileName?.length! > 30 ? `${fileName?.substring(0, 30)!} ..` : fileName}
// 						</div>
// 						<RFlex>
// 							{percentage == 100 && isSuccess ? (
// 								<CircleCheck className="text-themeSuccess text-[19px]"/>
// 							) : (
// 								<>
// 									{percentage != 100 && (
// 										<>
// 											{!isPaused ? (
// 												<button
// 													type="button"
// 													onClick={() => pauseFile(uploadId)}
// 													className="flex items-center justify-center border-2 border-themePrimary rounded-full bg-themeSecondary w-[20px] h-[20px]"
// 												>
// 													<span className="text-themePrimary font-bold text-[12px]">
// 														<Pause  className={" text-themePrimary text-[12px]"} />
// 													</span>
// 												</button>
// 											) : (
// 												<button
// 													type="button"
// 													disabled={percentage == 100}
// 													onClick={() => resumeFile(uploadId)}
// 													className="flex items-center justify-center border-2 border-themePrimary rounded-full bg-themeSecondary w-[20px] h-[20px]"
// 												>
// 													<span className="text-themePrimary font-bold text-[12px]">
// 														<Play className={"text-themePrimary text-[12px]"}/>
// 													</span>
// 												</button>
// 											)}
// 										</>
// 									)}
// 								</>
// 							)}
// 							{percentage != 100 && !isSuccess && (
// 								<button
// 									type="button"
// 									// disabled={percentage == 100}
// 									onClick={() => removeFile(uploadId)}
// 									className="flex items-center justify-center border-2 border-themeZinc rounded-full bg-themeSecondary w-[20px] h-[20px]"
// 								>
// 									<span className="text-themeZinc font-bold text-[12px]">x</span>
// 								</button>
// 							)}
// 						</RFlex>
// 					</RFlex>

// 					{/* Uploaded size / total size */}
// 					<span className="text-[12px] text-themeLight">
// 						{`${formatFileSize(percentage == 100 ? total! : uploaded!)} / ${formatFileSize(total!)}`}
// 					</span>

// 					{/* Progress bar */}
// 					<RFlex classes="items-center mt-[-5px]">
// 						<div className="w-full h-[8px] bg-[#E3E3ED] rounded-full overflow-hidden">
// 							<div className={`${timerProgressColor} h-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
// 						</div>
// 						<div
// 							className={`${percentage === 100 && isSuccess ? "text-themeSuccess" : errorMessage ? "text-themeDanger" : "text-themeLight"}`}
// 						>
// 							{errorMessage ? "Error" : percentage + "%"}
// 						</div>
// 					</RFlex>

// 					{/* Status message */}
// 					<span className="text-[12px]">
// 						{/* Status message */}
// 						{errorMessage ? (
// 							<span className="text-themeDanger">{errorMessage}</span>
// 						) : (
// 							<>
// 								{percentage === 100 && isSuccess
// 									? "Upload Successful! "
// 									: percentage === 100 && !isSuccess
// 									? "Processing .. "
// 									: "Uploading... "}
// 							</>
// 						)}
// 					</span>
// 				</RFlex>
// 			</div>
// 		);
// 	});

// 	return <div className="flex flex-col gap-[15px] mt-3">{thumbs}</div>;
// };

// export default FilesList;


// import React from "react";
// import styles from "./FileUploader.module.css";
// import {
//   imageTypes,
//   fileTypes,
//   fileExcel,
//   fileWord,
//   filePowerPoint,
//   filePdf,
//   fileVideo,
//   fileAudio,
//   fileZip,
//   powerPointIcon,
//   excelIcon,
//   videoIcon,
//   audioIcon,
//   fileIcon,
//   wordIcon,
//   pdfIcon,
//   zipIcon,
//   defaultImage,
// } from "@/config/mimeTypes";
// import RFlex from "@/components/Reusable-Components/Reusable-Flex";
// import { formatFileSize } from "@/utils/formatFileSize";
// import { CircleCheck, Pause, Play } from "lucide-react";
// import { IFile, IFilesList } from "@/interfaces/FileUploader";

// const FilesList = React.memo(({ 
//   files, 
//   pausedFiles, 
//   progress, 
//   removeFile, 
//   pauseFile, 
//   resumeFile 
// }: IFilesList) => {
//   return (
//     <div className="flex flex-col gap-[15px] mt-3">
//       {files.map((fileObj, index) => {
//         const type = fileObj.mimeType ?? "";
//         const fileName = fileObj?.file?.name ?? fileObj?.name ?? "Untitled";
// 		const fileSize = fileObj?.file?.size ?? 0;
//         const uploadId = fileObj.uploadId ?? `file-${index}`;
//         const fileProgress = progress[uploadId] ?? {};

//         const { progress: percentage = 0, uploaded = 0, total = fileSize, errorMessage, isSuccess } = fileProgress;
//         const isPaused = pausedFiles[uploadId] || false;

//         const fSource = getFileSource(type, fileObj);

//         return (
//           <div
//             key={`${uploadId}-${index}`}
//             className="flex gap-[15px] items-center h-[90px] rounded-[8px] p-[8px]"
//             style={{ boxShadow: "0px 4px 16px #00000024" }}
//           >
//             <div className={styles.image__container}>
//               <img                 
// 			  className={styles.image__content} 
//                 src={fSource} 
//                 alt={fileName} 
//                 onError={(e) => {
//                   // Fallback to default icon if image fails to load
//                   const img = e.target as HTMLImageElement;
//                   img.src = fileIcon;
//                 }}
// 				 />
//             </div>
//             <RFlex classes="gap-0 flex-col w-full">
//               <RFlex classes="justify-between">
//                 <div className="font-bold">
//                   {fileName?.length > 30 ? `${fileName.substring(0, 30)}..` : fileName}
//                 </div>
//                 <RFlex>
//                   {renderFileActions(percentage, isSuccess, isPaused, uploadId, pauseFile, resumeFile, removeFile)}
//                 </RFlex>
//               </RFlex>

//               <span className="text-[12px] text-themeLight">
//                 {`${formatFileSize(percentage === 100 ? total : uploaded)} / ${formatFileSize(total)}`}
//               </span>

//               <RFlex classes="items-center mt-[-5px]">
//                 <div className="w-full h-[8px] bg-[#E3E3ED] rounded-full overflow-hidden">
//                   <div 
//                     className={`${getProgressColor(percentage, isSuccess, errorMessage)} h-full transition-all duration-500`} 
//                     style={{ width: `${percentage}%` }} 
//                   />
//                 </div>
//                 <div className={getPercentageColor(percentage, isSuccess, errorMessage)}>
//                   {errorMessage ? "Error" : `${percentage}%`}
//                 </div>
//               </RFlex>

//               <span className="text-[12px]">
//                 {getStatusMessage(errorMessage, percentage, isSuccess)}
//               </span>
//             </RFlex>
//           </div>
//         );
//       })}
//     </div>
//   );
// });

// // Helper functions for cleaner JSX
// const getFileSource = (type: string, fileObj: IFile): string => {
//   if (type === "image/tiff") return defaultImage;
//   if (imageTypes.includes(type)) return fileObj.url || defaultImage;
//   if (fileTypes.includes(type)) return fileIcon;
//   if (fileWord.includes(type)) return wordIcon;
//   if (fileExcel.includes(type)) return excelIcon;
//   if (filePowerPoint.includes(type)) return powerPointIcon;
//   if (filePdf.includes(type)) return pdfIcon;
//   if (fileVideo.includes(type)) return videoIcon;
//   if (fileAudio.includes(type)) return audioIcon;
//   if (fileZip.includes(type)) return zipIcon;
//   return fileIcon;
// }

// function getProgressColor(percentage: number, isSuccess: boolean | undefined, errorMessage?: string | null): string {
//   if (errorMessage) return "bg-themeDanger";
//   if (percentage === 100 && isSuccess) return "bg-themeSuccess";
//   return "bg-themePrimary";
// }

// function getPercentageColor(percentage: number, isSuccess: boolean | undefined, errorMessage?: string | null) {
//   if (errorMessage) return "text-themeDanger";
//   if (percentage === 100 && isSuccess) return "text-themeSuccess";
//   return "text-themeLight";
// }

// function getStatusMessage(errorMessage?: string | null, percentage?: number, isSuccess?: boolean) {
//   if (errorMessage) return <span className="text-themeDanger">{errorMessage}</span>;
//   if (percentage === 100 && isSuccess) return "Upload Successful!";
//   if (percentage === 100 && !isSuccess) return "Processing..";
//   return "Uploading...";
// }

// function renderFileActions(
//   percentage: number,
//   isSuccess: boolean | undefined,
//   isPaused: boolean,
//   uploadId: string,
//   pauseFile: (id: string) => void,
//   resumeFile: (id: string) => void,
//   removeFile: (id: string) => void
// ) {
//   if (percentage === 100 && isSuccess) {
//     return <CircleCheck className="text-themeSuccess text-[19px]" />;
//   }

//   if (percentage !== 100) {
//     return (
//       <>
//         {!isPaused ? (
//           <button
//             type="button"
//             onClick={() => pauseFile(uploadId)}
//             className="flex items-center justify-center border-2 border-themePrimary rounded-full bg-themeSecondary w-[20px] h-[20px]"
//           >
//             <Pause className="text-themePrimary text-[12px]" />
//           </button>
//         ) : (
//           <button
//             type="button"
//             onClick={() => resumeFile(uploadId)}
//             className="flex items-center justify-center border-2 border-themePrimary rounded-full bg-themeSecondary w-[20px] h-[20px]"
//           >
//             <Play className="text-themePrimary text-[12px]" />
//           </button>
//         )}
//         {!isSuccess && (
//           <button
//             type="button"
//             onClick={() => removeFile(uploadId)}
//             className="flex items-center justify-center border-2 border-themeZinc rounded-full bg-themeSecondary w-[20px] h-[20px] ml-1"
//           >
//             <span className="text-themeZinc font-bold text-[12px]">x</span>
//           </button>
//         )}
//       </>
//     );
//   }

//   return null;
// }

// export default FilesList;



// import React from "react";
// import styles from "./FileUploader.module.css";
// import {
//   imageTypes,
//   fileTypes,
//   fileExcel,
//   fileWord,
//   filePowerPoint,
//   filePdf,
//   fileVideo,
//   fileAudio,
//   fileZip,
//   powerPointIcon,
//   excelIcon,
//   videoIcon,
//   audioIcon,
//   fileIcon,
//   wordIcon,
//   pdfIcon,
//   zipIcon,
//   defaultImage,
// } from "@/config/mimeTypes";
// import RFlex from "@/components/Reusable-Components/Reusable-Flex";
// import { formatFileSize } from "@/utils/formatFileSize";
// import { CircleCheck, Pause, Play } from "lucide-react";
// import { IFilesList, IFile } from "@/interfaces/FileUploader";

// const FilesList = ({ 
//   files, 
//   pausedFiles, 
//   progress, 
//   removeFile, 
//   pauseFile, 
//   resumeFile 
// }: IFilesList) => {
//   const getFileSource = (type: string, fileObj: IFile): string => {
//     if (type === "image/tiff") return defaultImage;
//     if (imageTypes.includes(type)) return fileObj.url || defaultImage;
//     if (fileTypes.includes(type)) return fileIcon;
//     if (fileWord.includes(type)) return wordIcon;
//     if (fileExcel.includes(type)) return excelIcon;
//     if (filePowerPoint.includes(type)) return powerPointIcon;
//     if (filePdf.includes(type)) return pdfIcon;
//     if (fileVideo.includes(type)) return videoIcon;
//     if (fileAudio.includes(type)) return audioIcon;
//     if (fileZip.includes(type)) return zipIcon;
//     return fileIcon;
//   };

//   const getProgressColor = (
//     percentage: number, 
//     isSuccess: boolean | undefined, 
//     errorMessage?: string | null
//   ): string => {
//     if (errorMessage) return "bg-themeDanger";
//     if (percentage === 100 && isSuccess) return "bg-themeSuccess";
//     return "bg-themePrimary";
//   };

//   const getStatusMessage = (
//     errorMessage?: string | null, 
//     percentage?: number, 
//     isSuccess?: boolean
//   ): React.ReactNode => {
//     if (errorMessage) return <span className="text-themeDanger">{errorMessage}</span>;
//     if (percentage === 100 && isSuccess) return "Upload Successful! ";
//     if (percentage === 100 && !isSuccess) return "Processing .. ";
//     return "Uploading... ";
//   };

//   return (
//     <div className="flex flex-col gap-[15px] mt-3">
//       {files.map((fileObj, index) => {
//         console.log("fileObj",fileObj)
//         const type = fileObj.mimeType ?? "";
//         const fileName = fileObj?.file?.name ?? fileObj?.name ?? "Untitled";
//         const fileSize = fileObj?.file?.size ?? 0;
//         const uploadId = fileObj.uploadId ?? `file-${index}`;

//         const fileProgress = progress[uploadId] ?? {};
//         const { 
//           progress: percentage = 0, 
//           uploaded = 0, 
//           total = fileSize, 
//           errorMessage, 
//           isSuccess 
//         } = fileProgress;

//         const isPaused = pausedFiles[uploadId] ?? false;
//         const fSource = getFileSource(type, fileObj);

//         return (
//           <div
//             key={`${uploadId}-${index}`}
//             className="flex gap-[15px] items-center h-[90px] rounded-[8px] p-[8px]"
//             style={{ boxShadow: "0px 4px 16px #00000024" }}
//           >
//             <div className={styles.image__container}>
//               <img 
//                 className={styles.image__content} 
//                 src={fSource} 
//                 alt={fileName} 
//                 // onError={(e) => {
//                 //   // Fallback to default icon if image fails to load
//                 //   const img = e.target as HTMLImageElement;
//                 //   img.src = fileIcon;
//                 // }}
//               />
//             </div>
//             <RFlex classes="gap-0 flex-col w-full">
//               <RFlex classes="justify-between">
//                 <div className="font-bold">
//                   {fileName.length > 30 ? `${fileName.substring(0, 30)}..` : fileName}
//                 </div>
//                 <RFlex>
//                   {/* File Actions */}
//                   {percentage === 100 && isSuccess ? (
//                     <CircleCheck className="text-themeSuccess text-[19px]"/>
//                   ) : percentage !== 100 ? (
//                     <>
//                       {!isPaused ? (
//                         <button
//                           type="button"
//                           onClick={() => pauseFile(uploadId)}
//                           className="flex items-center justify-center border-2 border-themePrimary rounded-full bg-themeSecondary w-[20px] h-[20px]"
//                         >
//                           <Pause className="text-themePrimary text-[12px]" />
//                         </button>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => resumeFile(uploadId)}
//                           className="flex items-center justify-center border-2 border-themePrimary rounded-full bg-themeSecondary w-[20px] h-[20px]"
//                         >
//                           <Play className="text-themePrimary text-[12px]" />
//                         </button>
//                       )}
//                       {!isSuccess && (
//                         <button
//                           type="button"
//                           onClick={() => removeFile(uploadId)}
//                           className="flex items-center justify-center border-2 border-themeZinc rounded-full bg-themeSecondary w-[20px] h-[20px] ml-1"
//                         >
//                           <span className="text-themeZinc font-bold text-[12px]">x</span>
//                         </button>
//                       )}
//                     </>
//                   ) : null}
//                 </RFlex>
//               </RFlex>

//               {/* Uploaded size / total size */}
//               <span className="text-[12px] text-themeLight">
//                 {`${formatFileSize(percentage === 100 ? total : uploaded)} / ${formatFileSize(total)}`}
//               </span>

//               {/* Progress bar */}
//               <RFlex classes="items-center mt-[-5px]">
//                 <div className="w-full h-[8px] bg-[#E3E3ED] rounded-full overflow-hidden">
//                   <div 
//                     className={`${getProgressColor(percentage, isSuccess, errorMessage)} h-full transition-all duration-500`} 
//                     style={{ width: `${percentage}%` }} 
//                   />
//                 </div>
//                 <div className={
//                   errorMessage 
//                     ? "text-themeDanger" 
//                     : (percentage === 100 && isSuccess) 
//                       ? "text-themeSuccess" 
//                       : "text-themeLight"
//                 }>
//                   {errorMessage ? "Error" : `${percentage}%`}
//                 </div>
//               </RFlex>

//               {/* Status message */}
//               <span className="text-[12px]">
//                 {getStatusMessage(errorMessage, percentage, isSuccess)}
//               </span>
//             </RFlex>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default FilesList;




import styles from "./FileUploader.module.css";
import {
  imageTypes,
  fileTypes,
  fileExcel,
  fileWord,
  filePowerPoint,
  filePdf,
  fileVideo,
  fileAudio,
  fileZip,
  powerPointIcon,
  excelIcon,
  videoIcon,
  audioIcon,
  fileIcon,
  wordIcon,
  pdfIcon,
  zipIcon,
  defaultImage,
} from "@/config/mimeTypes";
import RFlex from "@/components/Reusable-Components/Reusable-Flex";
import { formatFileSize } from "@/utils/formatFileSize";
import { CircleCheck, PauseCircle, PlayCircle } from "lucide-react";

	        // @ts-ignore
const RFilesList = ({ files,parentFiles, pausedFiles, progress, removeFile, pauseFile, resumeFile }) => {      
	const mergedArr = parentFiles ? [{...files[0], ...parentFiles[0]}] : files
	console.log("newArr",mergedArr)
	// @ts-ignore
	const thumbs = Object.keys(mergedArr[0]).length > 0 && mergedArr?.map((fileObj, index) => {
		// console.log("fileObj 123", fileObj, pausedFiles);
		console.log("files", files)
		const type = fileObj?.mimeType;
		const fileName = fileObj?.file?.name ?? fileObj?.name;
		const fileSize = fileObj?.file?.size;
		const uploadId = fileObj?.uploadId;

		// Determine file source for preview
		const fSource =
			type == "image/tiff"
				? defaultImage
				: imageTypes.includes(type)
				? fileObj.url
				? fileObj.url
				: fileObj.preview
				: fileTypes.includes(type)
				? fileIcon
				: fileWord.includes(type)
				? wordIcon
				: fileExcel.includes(type)
				? excelIcon
				: filePowerPoint.includes(type)
				? powerPointIcon
				: filePdf.includes(type)
				? pdfIcon
				: fileVideo.includes(type)
				? videoIcon
				: fileAudio.includes(type)
				? audioIcon
				: fileZip.includes(type)
				? zipIcon
				: fileIcon;

		// Get progress details for this file
		const fileProgress = progress[uploadId] || {}; // Default to an empty object
		const { progress: percentage = 0, uploaded = 0, total = fileSize, errorMessage, isSuccess } = fileProgress;
		const isPaused = pausedFiles[uploadId] || false;

		// Progress bar color
		const timerProgressColor = percentage === 100 && isSuccess ? "bg-green-500" : "bg-primary";
		console.log("isSuccess", isSuccess);

		return (
			<div
				key={index}
				className="flex gap-[15px] items-center h-[90px] rounded-[8px] p-[8px]"
				style={{ boxShadow: "0px 4px 16px #00000024" }}
			>
				<div className={styles.image__container}>
					<img className={styles.image__content} src={fSource} alt={fileName} />

					{/* Show progress overlay if not complete */}
					{/* {!fileObj?.url && percentage !== 100 && (
                        <div className={styles.progress}>
                            <div className="progress-bar">
                                {percentage}%
                            </div>
                        </div>
                    )} */}
				</div>
				<RFlex classes="gap-0 justify-stretch items-stretch flex-col w-full">
					<RFlex classes="justify-between items-stretch">
						<div className="font-bold">
							{/* {fileName} */}
							{fileName?.length > 30 ? `${fileName.substring(0, 30)} ..` : fileName}
						</div>
						<RFlex classes="gap-1">
							{percentage == 100 && isSuccess ? (
								<CircleCheck className={" text-green-500 text-[19px]"} />
							) : (
								<>
									{percentage != 100 && (
										<>
											{!isPaused ? (
												<button
													type="button"
													onClick={() => pauseFile(uploadId)}
													className="flex items-center justify-center border-2 border-primary rounded-full bg-secondary w-[20px] h-[20px]"
												>
													<span className="text-primary font-bold text-[12px]">
														<PauseCircle className={"text-primary text-[12px]"} />
													</span>
												</button>
											) : (
												<button
													type="button"
													disabled={percentage == 100}
													onClick={() => resumeFile(uploadId)}
													className="flex items-center justify-center border-2 border-primary rounded-full bg-secondary w-[20px] h-[20px]"
												>
													<span className="text-primary font-bold text-[12px]">
														<PlayCircle className={"text-primary text-[8px]"} />
													</span>
												</button>
											)}
										</>
									)}
								</>
							)}
							{/* {percentage != 100 && !isSuccess && ( */}
								<button
									type="button"
									// disabled={percentage == 100}
									onClick={() => removeFile({uploadId,public_id:mergedArr?.public_id, resourceType:mergedArr?.resourceType})}
									className="flex items-center justify-center border-2 border-zinc-500 rounded-full bg-secondary w-[20px] h-[20px]"
								>
									<span className="text-zinc-500 font-bold text-[12px]">
										X
									</span>
								</button>
							{/* )} */}
						</RFlex>
					</RFlex>

					{/* Uploaded size / total size */}
					<span className="text-[12px] text-gray-900">
						{`${formatFileSize(percentage == 100 ? total : uploaded)} / ${formatFileSize(total)}`}
					</span>

					{/* Progress bar */}
					<RFlex classes="justif-stretch mt-[-5px]">
						<div className="w-full h-[8px] bg-[#E3E3ED] rounded-full overflow-hidden">
							<div className={`${timerProgressColor} h-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
						</div>
						<div
							className={`text-sm ${percentage === 100 && isSuccess ? "text-green-500" : errorMessage ? "text-red-500" : "text-gray-900"}`}
						>
							{errorMessage ? "Error" : percentage + "%"}
						</div>
					</RFlex>

					{/* Status message */}
					<span className="text-[12px]">
						{/* Status message */}
						{errorMessage ? (
							<span className="text-red-500">{errorMessage}</span>
						) : (
							<>
								{percentage === 100 && isSuccess
									? "Upload Successful! "
									: percentage === 100 && !isSuccess
									? "Processing .. "
									: "Uploading... "}
							</>
						)}
					</span>
				</RFlex>
			</div>
		);
	});

	return <div className="flex flex-col gap-[15px] mt-3">{thumbs}</div>;
};

export default RFilesList;