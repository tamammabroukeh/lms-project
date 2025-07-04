import { ICourse } from "@/interfaces/course";

export default function Course({ onClick, course: { level, category, image, pricing, instructorName, title, } }: { course: ICourse; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="border rounded-lg overflow-hidden shadow cursor-pointer"
        >
            <img
                src={image}
                width={300}
                height={150}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold mb-2">{title}</h3>
                <div className="flex justify-between">
                    <p className="text-sm text-gray-700 mb-2">
                        {instructorName}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        {level.en}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="font-bold text-[16px]">
                        ${pricing}
                    </p>

                    <p className="font-bold text-[16px]">
                        {category.en}
                    </p>
                </div>
            </div>
        </div>
    )
}
