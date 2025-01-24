import data from "../../json/componentDescriptions.json";

export default async function Detail({ params }) {
    const {componentId} = await params;
    const componentData = data[componentId];

    if (!componentData) {
        return (
            <div>
                <h1>Component Not Found</h1>
                <p>The component you are looking for does not exist.</p>
            </div>
        );
    }

    const {name, description, props} = componentData;

    return (
        <div className="flex flex-col items-center gap-20 pt-4 pb-20 px-2">
            <div className="flex flex-col items-start gap-2">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-[#3D3D3D]">{description}</p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
                <p className="text-2xl font-semibold">Try</p>

                <div className="flex flex-row justify-center gap-3 w-full">
                    <div className="border rounded-lg w-[220px]">
                    </div>

                    <div className="flex flex-row items-center border rounded-lg w-[calc(100%-220px)] px-12 py-10">

                        {Object.entries(props).map(([propName, propDetails], index) => (
                            <div key={propName} className="flex flex-row items-start h-full">
                                <div className={`flex flex-col gap-3 items-center ${index === 0 ? 'pl-0' : 'pl-12'} pr-12`}>
                                    <div className="flex flex-col items-center">
                                        <p className="text-[#3D3D3D] text-[12px]">{propDetails.type}</p>
                                        <p className="text-[#3D3D3D] font-medium">{propName}</p>
                                    </div>

                                    <div className="flex flex-col gap-1.5 items-center">
                                        {propDetails.choices.map((choice, index) => (
                                            <button key={index} className="border border-[#999999] rounded-[4px] py-0.5 px-2">
                                                <p className="text-[#777777] text-sm">{choice}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-full border-l"></div>
                            </div>
                        ))}


                    </div>
                </div>

                <div className="border rounded-lg h-[100px] w-full bg-[#FBFBFB]">
                </div>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
                <p className="text-2xl font-semibold">Example</p>

                <div className="flex flex-col gap-2 border rounded-lg w-full p-2">
                    <div className="border rounded-lg h-[220px] w-full bg-[#F2F2F2]">
                    </div>

                    <div className="border rounded-lg h-[220px] w-full bg-[#FBFBFB]">
                    </div>
                </div>
            </div>
        </div>
    );
}