import LoadingSpinner from "@/assets/loading-spinner.svg"

export default function Loader() {
  return (
    <div className="flex flex-col items-center">
        <img src={LoadingSpinner} className="w-[20%] min-h-screen"/>
    </div>
  )
}