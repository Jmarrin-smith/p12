import styles from "./biglist.module.css";

export default async function ListPage() {
  async function handlesubmitnewitem() {
    "use server";

    //function fetch list, store list as arr of obj, link up the map so it makes sense line 16 ,22 ,45

    console.log("form action done");

    const additem = formData.get("additem");

    console.log(additem);
    //sql query additem (coloms) , ($1,elo 1200 )[additem]
  }

  const placeholder = [
    { id: 0, name: "left" },
    { id: 1, name: "orange" },
    { id: 2, name: "world peace" },
  ];

  const listItems = placeholder.map((item) => (
    <li key={item.id}>{item.name}</li>
  ));

  return (
    <>
      <h1>the big list</h1>
      <div className={styles.additemformbtn}>
        <button>add item</button>
      </div>
      <br />
      <div className={styles.additemforminput}>
        <form action={handlesubmitnewitem}>
          <input
            type="text"
            autoComplete="off"
            maxLength={45}
            name="additem"
            placeholder="add item"
          />
          <button>add item</button>
        </form>
      </div>
      <div className={styles.list}>
        <ol>{listItems}</ol>
      </div>
    </>
  );
}
