"use client";
import { useState, useEffect } from "react";
import styles from "./biglist.module.css";
import Image from "next/image";

export default function ListPage() {
  const listId = 1;
  const [list, setList] = useState([]);
  const [listName, setListName] = useState("null");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListName() {
      try {
        const response = await fetch(`api/lists/id/${listId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setListName(data.name);
        console.log(data.name);
      } catch (error) {
        console.error("Error fetching list name", error);
        setError("Failed to fetch list name");
      }
    }


    async function fetchListData() {
      try {
        const response = await fetch(`api/items/list/${listId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching list data:", error);
        setError("Failed to fetch list data.");
      }
    }


    fetchListName();
    fetchListData();
  }, [listId]);

  async function handleSubmitNewItem(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const addItem = formData.get("additem");

    if (!addItem) {
      console.error("No item to add");
      return;
    }

    try {
      const response = await fetch(`api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: addItem,
          list_id: listId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item.");
      }

      const newItem = await response.json();
      setList((prevList) => [...prevList, newItem]);
      event.target.reset();
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Failed to add item.");
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Move the listItems logic here
  const listItems =
    Array.isArray(list) && list.length > 0 ? (
      list.map((item, index) => (
        <div className={styles.tile} key={item.id}>
          <div className={styles.imageContainer}>
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                width={80}
                height={80}
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>No Image Added</div>
            )}
          </div>
          <p>
            {index + 1}. {item.name}
          </p>{" "}
          {/* Add ordered number */}
          <p>ELO: {item.elo}</p>
        </div>
      ))
    ) : (
      <div className={styles.tile}>
        <p>No items available</p>
      </div>
    );


  return (
    <>
      <div className={styles.additemformbtn}>
        <button>Add Item</button>
      </div>
      <br />
      <div className={styles.additemforminput}>
        <form onSubmit={handleSubmitNewItem}>
          <input
            type="text"
            autoComplete="off"
            maxLength={45}
            name="additem"
            placeholder="Add item"
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
      <div className={styles.list}>

        <p className={styles.listLegend}>
          List Name = {listName} | List ID = {listId}
        </p>

        <p className={styles.listLegend}>Item Name : ELO Score</p>
        <div className={styles.tilesContainer}>{listItems}</div>

      </div>
    </>
  );
}
