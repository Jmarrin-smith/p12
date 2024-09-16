import styles from "./addlist.module.css";

export default async function ListPage() {
  async function handlesubmitnewitem() {
    "use server";

    console.log("form action done");

    const additem = formData.get("additem");

    console.log(additem);
    // could store form data in array in local storage and then wipe local storage upon cancel and finished (along with posting to reduce stress)
  }

  return (
    <>
      <br />
      <h1 className={styles.h1}>make a list</h1>
      <br />
      <div className={styles.additem}>
        <div className={styles.additemforminputbox}>
          <form
            action={handlesubmitnewitem}
            className={styles.additemforminput}
          >
            <input
              type="text"
              autoComplete="off"
              maxLength={45}
              name="additem"
              placeholder="add item"
            />
            <button>submit</button>
          </form>
        </div>
      </div>
      {/* finishing list requires page nav and post of data to supabase */}
      <div className={styles.finishlist}>
        <form>
          <button>list done</button>
        </form>
      </div>
      {/* users should have the ability to cancel list and be redirected to previos page */}
      <div className={styles.cancel}>
        <form>
          <button>cancel</button>
        </form>
      </div>
    </>
  );
}
