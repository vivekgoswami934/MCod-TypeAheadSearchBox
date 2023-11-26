import "./App.css";
import ListBox from "./Components/ListBox";
import SearchBox from "./Components/SearchBox";
const maxItems = 5;
export default function App() {
  const transformData = (data) => data.results.slice(0, maxItems);
  const dataPromiseFn = async (query, signal) =>
    await fetch(`https://swapi.dev/api/people/?search=${query}`, { signal });
  return (
    <div className="wrapper">
      <SearchBox
        id="personName"
        name="personName"
        label="Enter Person Name"
        placeholder="Enter your fav star war char"
        autoComplete
        styles={{
          label: "label",
          input: "input",
        }}
        debounceWait={200}
        listBox={(items, activeIndex) => (
          <ListBox items={items} activeIndex={activeIndex} />
        )}
        noItemMessage={() => <div>Sorry no person found</div>}
        errorMessage={() => <div>Something went wrong</div>}
        transformData={transformData}
        promise={dataPromiseFn}
      />
    </div>
  );
}
