'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const components = ["Button", "Float Button", "Switch", "Divider", "Checkbox"];
    const pathName = usePathname();

    return (
        <aside className="border-r p-6 w-52 min-w-52">
            <ul className="space-y-4">
                {components.map((component, index) => {
                    const componentPath = `/${component.replace(/\s+/g, "").toLowerCase()}`;
                    const isActive = pathName === componentPath;

                    return (
                        <li key={index}>
                            <Link href={componentPath}>
                                <button
                                    className={`text-left block w-full transition-colors ${
                                        isActive
                                            ? "text-blue-500 weight-600"
                                            : "text-gray-700 hover:text-blue-500"
                                    }`}
                                >
                                    {component}
                                </button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
