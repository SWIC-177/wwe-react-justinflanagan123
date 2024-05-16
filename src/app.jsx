import Table from "./components/table";

export default function App() {
  return (
    <Table
      col1={["item1", "item2", "item3"]}
      col2={["stuff1", "stuff2", "stuff3"]}
      col1Header="Stuff"
      col2Header="More Stuff"
    />
  );
}
