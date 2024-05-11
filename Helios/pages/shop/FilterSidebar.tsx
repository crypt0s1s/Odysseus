import { ReactNode } from "react";

const FilterSidebar = () => {
  return (
    <div
      className="top-0 left-0 h-screen w-[220px] m-0 
    flex flex-col bg-white text-blue-800 px-6 py-4 gap-4
     border-2 border-gray-200 shadow"
    >
      <SideBarSection title={"Category 1"}>
        <ul>
          <CheckBoxListItem text={"item01"} />
          <CheckBoxListItem text={"item02"} />
          <CheckBoxListItem text={"item03"} />
        </ul>
      </SideBarSection>

      <SideBarSection title={"Category 2"}>
        <ul>
          <CheckBoxListItem text={"item01"} />
          <CheckBoxListItem text={"item02"} />
          <CheckBoxListItem text={"item03"} />
        </ul>
      </SideBarSection>

      <SideBarSection title={"Category 3"}>
        <ul>
          <CheckBoxListItem text={"item01"} />
          <CheckBoxListItem text={"item02"} />
          <CheckBoxListItem text={"item03"} />
        </ul>
      </SideBarSection>

      <SideBarSection title={"Price"}>
        <div className="flex flex-row gap-3">
          <TextInput placeholder={"Min"} type={"number"} />
          <TextInput placeholder={"Max"} type={"number"} />
        </div>
        <GoButton />
      </SideBarSection>
    </div>
  );
};

function GoButton() {
  return (
    <button
      type="submit"
      className="flex h-8 w-[50px] justify-center items-center px-4 py-2 text-white bg-blue-500 border-blue-500  hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    >
      Go
    </button>
  );
}

function SideBarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <b className="">{title}</b>
      {children}
    </div>
  );
}

function CheckBoxListItem({ text }: { text: string }) {
  return (
    <li>
      <input
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {text}
      </label>
    </li>
  );
}

function TextInput({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <input
        type={type}
        className="h-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default FilterSidebar;
