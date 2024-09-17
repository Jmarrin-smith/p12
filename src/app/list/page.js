import styles from "./biglist.module.css";

export default async function ListPage() {
  async function handlesubmitnewitem() {
    "use server";

    //function fetch list, store list as arr of obj, link up the map so it makes sense line 16 ,22 ,45

    console.log("form action done");

    const additem = formData.get("additem");

    console.log(additem);
    //sql query additem (columns) , ($1, elo 1200 )[additem]
  }

  const placeholder = [
    { id: 0, name: "left" },
    { id: 1, name: "orange" },
    { id: 2, name: "world peace" },
  ];

  const listItems = placeholder.map((item) => (
    <li key={item.id}>{item.name}</li>
  ));

  function hideForm() {
    const addItemFormHide = document.getElementById("addItemForm");
    const hideSetting = addItemFormHide.style.display;
    if (hideSetting.style.display == "none") {
      hideSetting.style.display = "block";
    } else {
      hideSetting.style.display = "none";
    }
  }

  return (
    <>
      <h1>the big list</h1>
      <div className={styles.additemformbtn}>
        <button onClick="hideForm()">add item</button>
      </div>
      <br />
      <div id="addItemForm" className={styles.additemforminput}>
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
