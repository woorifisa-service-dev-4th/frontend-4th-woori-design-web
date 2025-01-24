import Link from "next/link";

export default function Sidebar() {
  const components = ["Button", "Float Button", "Switch", "Divider", "Checkbox"];

  return (
    <aside className="border-r p-6 w-52 min-w-52">
      <ul className="space-y-4">
        {components.map((component, index) => (
          <li key={index}>
            <Link href={`/${component.replace(/\s+/g, "").toLowerCase()}`}>
              <button className="text-left block w-full text-xl text-gray-700 hover:text-blue-500 transition-colors">
                {component}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
