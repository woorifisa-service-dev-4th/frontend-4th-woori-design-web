'use client';

import data from "../../json/componentDescriptions.json";
import {useEffect, useRef, useState} from "react";
import { Switch } from "@/libs/switch";
import { Button } from "@/libs/button";
import WooriFloatButton from "@/libs/floatbutton/WooriFloatButton.jsx";

export default function Detail({ params }) {
    const [componentData, setComponentData] = useState(null);
    const [selectedChoices, setSelectedChoices] = useState({});
    const [exampleCode, setExampleCode] = useState("");

    const generateExampleCode = (componentName, choices, propsConfig = {}) => {
        const propsString = Object.entries(choices)
            .map(([key, value]) => {
                const propType = propsConfig[key]?.type;

                const formattedValue =
                    propType === "boolean"
                        ? `{${value}}`
                        : propType === "function"
                            ? `{${value}}`
                            : `"${value}"`;

                return `${key}=${formattedValue}`;
            })
            .join(" ");

        setExampleCode(`<${componentName} ${propsString} />`);
    };

    useEffect(() => {
        async function fetchParams() {
            const { componentId } = await params;
            const fetchedData = data[componentId];
            if (!fetchedData) {
                setComponentData(null);
                return;
            }

            setComponentData(fetchedData);

            const initialChoices = {};
            Object.entries(fetchedData.props || {}).forEach(([propName, propDetails]) => {
                initialChoices[propName] = propDetails.default;
            });
            setSelectedChoices(initialChoices);

            generateExampleCode(fetchedData.name, initialChoices, fetchedData.props);
        }

        fetchParams();
    }, [params]);

    const handleChoiceSelect = (propName, choice) => {
        const updatedChoices = {
            ...selectedChoices,
            [propName]: choice,
        };
        setSelectedChoices(updatedChoices);

        generateExampleCode(componentData.name, updatedChoices, componentData.props);
    };

    if (!componentData) {
        return (
            <div>
                <h1>Component Not Found</h1>
                <p>The component you are looking for does not exist.</p>
            </div>
        );
    }

    const { name, description, props } = componentData || {};

    const renderComponent = () => {
        if (name === "Switch") {
            return <Switch {...selectedChoices} />;
        } else if (name === "Button") {
            return <Button {...selectedChoices} />;
        } else if (name === "Float Button") {
            return <WooriFloatButton {...selectedChoices} style={{position: "absolute", top: "-20px", left: "-15px"}} />;
        }

        return null;
    };

    return (
        <div className="flex flex-col items-center gap-20 pt-4 pb-20 px-2 max-w-[1380px] min-w-[1080px]">
            <div className="flex flex-col items-start gap-2 w-full">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-[#3D3D3D]">{description}</p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
                <p className="text-2xl font-semibold">Try</p>

                <div className="flex flex-row justify-center gap-3 w-full">
                    <div className="flex flex-col items-center justify-center border rounded-lg w-[220px]">
                        {renderComponent()}
                    </div>

                    <div
                        className="flex flex-row items-center border rounded-lg w-[calc(100%-220px)] px-12 py-10 overflow-x-auto">
                        {props &&
                            Object.entries(props).map(([propName, propDetails], index) => (
                                <div key={propName} className="flex flex-row items-start h-full">
                                    <div
                                        className={`flex flex-col gap-3 items-center ${
                                            index === 0 ? "pl-0" : "pl-12"
                                        } pr-12`}
                                    >
                                        <div className="flex flex-col items-center">
                                            <p className="text-[#3D3D3D] text-[12px]">{propDetails.type}</p>
                                            <p className="text-[#3D3D3D] font-medium">{propName}</p>
                                        </div>

                                        <div className="flex flex-col gap-1.5 items-center">
                                            {propDetails.choices.map((choice, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleChoiceSelect(propName, choice)}
                                                    className={`border rounded-[4px] py-0.5 px-2 ${
                                                        selectedChoices[propName] === choice
                                                            ? "border-blue-500 text-blue-500 bg-[#F4FAFF]"
                                                            : "border-[#999999] text-[#777777]"
                                                    }`}
                                                >
                                                    <p className="text-sm">{choice.toString()}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-full border-l"></div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="border rounded-lg h-[100px] w-full bg-[#FBFBFB] flex items-center justify-center px-4">
                    <code className="text-sm text-[#333] whitespace-pre-wrap">{exampleCode}</code>
                </div>
            </div>
        </div>
    );
}
