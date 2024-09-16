import styles from "./biglist.module.css";

export default async function ListPage() {
  async function handlesubmitnewitem() {
    "use server";

    console.log("form action done");

    const additem = formData.get("additem");

    console.log(additem);
  }

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
        </form>
      </div>
    </>
  );
}
