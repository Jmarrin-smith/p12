import Votecards from "../pagecomponants/votecards";
import styles from "./vote.module.css";

export default function VotePage() {
  `use server`;

  const apiRoot = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Need a way to vary this
  const listId = 1;

  async function fetchListData() {
    {
      const response = await fetch(`${apiRoot}/items/list/${listId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    }
  }

  function generateUniqueIndexPairs(list) {
    const pairs = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (Math.random() < 0.5) {
          pairs.push([i, j]);
        } else {
          pairs.push([j, i]);
        }
      }
    }

    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    return pairs;
  }

  // GETS ALL ITEMS FROM THE LIST
  let items = fetchListData();
  // Gets ALL unique pairs
  let pairs = generateUniqueIndexPairs(items);

  // console.log(items);
  // console.log(pairs);

  // This function just updates the elo based on item ID
  async function updateItemElo(itemId, newElo) {
    try {
      const response = await fetch(`/api/items/id/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ elo: newElo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedItemData = await response.json();
      console.log("Item updated successfully:", updatedItemData);
      return updatedItemData; // You can use this data if needed
    } catch (error) {
      console.error("There was a problem updating the item:", error);
      // You might want to handle the error more gracefully in a real application
      throw error;
    }
  }

  function getItemInfo(indeces, items) {
    const indexA = indeces[0];
    const indexB = indeces[1];

    const itemA = items[indexA];
    const itemB = items[indexB];

    const nameA = itemA.name;
    const nameB = itemB.name;

    const idA = itemA.id;
    const idB = itemB.id;

    const imgSrcA = itemA.image_url;
    const imgSrcB = itemB.image_url;

    const eloA = itemA.elo;
    const eloB = itemB.elo;

    return { nameA, nameB, idA, idB, imgUrlA, imgUrlB, eloA, eloB };
  }

  function getItems(indeces, items) {
    const indexA = indeces[0];
    const indexB = indeces[1];

    const itemA = items[indexA];
    const itemB = items[indexB];

    return itemA, itemB;
  }

  let usepair = getItemInfo(pairs, items);

  console.log(usepair);
  function displayarrayreset() {
    "use server";
    delete usepair.eloA;
    delete usepair.eloB;
    delete usepair.idA;
    delete usepair.idB;
    delete usepair.imgUrlA;
    delete usepair.imgUrlB;
    delete usepair.nameA;
    delete usepair.nameB;
    return generateUniqueIndexPairs(items);
  }

  //redundant demo testing
  // eloRating(1200, 1000, 30, 1);
  // eloRating(1600, 600, 30, 0.5);
  // eloRating(1200, 1200, 30, 0);

  let placeholderA = { item: "itemA", elo: 400 };

  let placeholderB = { item: "itemB", elo: 400 };

  async function awin() {
    "use server";
    //calculate the Probability of winning
    function probability(rating1, rating2) {
      // expected score
      return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
    }

    function eloRating(itemArating, itemBrating, K, outcome) {
      // outcome is a number 1 is item A winnig 0 is item B winning and a draw is .5
      //Probability of Player B
      let Pb = probability(itemArating, itemBrating);

      //Probability of Player A
      let Pa = probability(itemBrating, itemArating);

      // Update Elo
      // k is a constant number i.e. 30
      itemArating = itemArating + K * (outcome - Pa);
      itemBrating = itemBrating + K * (1 - outcome - Pb);

      // updated Elo
      console.log("Updated Ratings:-");
      console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
      // math floor to round the figure to a whole number
      itemArating = Math.floor(itemArating);
      itemBrating = Math.floor(itemBrating);
      console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
      console.log(Pa + Pb);
      return { itemArating, itemBrating };
    }

    // use random item pair
    const newrating = eloRating(usepair.eloA, usepair.eloB, 30, 1); //returns {itemArating , itemBrating }
    //update elo in db
    updateItemElo(usepair.idA, newrating.itemArating);
    updateItemElo(usepair.idA, newrating.itemArating);
    pairs = displayarrayreset();

    getItemInfo(pairs, items);
  }

  async function bwin() {
    "use server";
    //calculate the Probability of winning
    function probability(rating1, rating2) {
      // expected score
      return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
    }

    function eloRating(itemArating, itemBrating, K, outcome) {
      // outcome is a number 1 is item A winnig 0 is item B winning and a draw is .5
      //Probability of Player B
      let Pb = probability(itemArating, itemBrating);

      //Probability of Player A
      let Pa = probability(itemBrating, itemArating);

      // Update Elo
      // k is a constant number i.e. 30
      itemArating = itemArating + K * (outcome - Pa);
      itemBrating = itemBrating + K * (1 - outcome - Pb);

      // updated Elo
      console.log("Updated Ratings:-");
      console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
      // math floor to round the figure to a whole number
      itemArating = Math.floor(itemArating);
      itemBrating = Math.floor(itemBrating);
      console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
      console.log(Pa + Pb);
      return { itemArating, itemBrating };
    }

    // use random item pair
    const newrating = eloRating(usepair.eloA, usepair.eloB, 30, 0); //returns {itemArating , itemBrating }
    //update elo in db
    updateItemElo(usepair.idA, newrating.itemArating);
    updateItemElo(usepair.idA, newrating.itemArating);
    pairs = displayarrayreset();

    getItemInfo(pairs, items);
  }

  async function draw() {
    "use server";
    //calculate the Probability of winning
    function probability(rating1, rating2) {
      // expected score
      return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
    }

    function eloRating(itemArating, itemBrating, K, outcome) {
      // outcome is a number 1 is item A winnig 0 is item B winning and a draw is .5
      //Probability of Player B
      let Pb = probability(itemArating, itemBrating);

      //Probability of Player A
      let Pa = probability(itemBrating, itemArating);

      // Update Elo
      // k is a constant number i.e. 30
      itemArating = itemArating + K * (outcome - Pa);
      itemBrating = itemBrating + K * (1 - outcome - Pb);

      // updated Elo
      console.log("Updated Ratings:-");
      console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
      // math floor to round the figure to a whole number
      itemArating = Math.floor(itemArating);
      itemBrating = Math.floor(itemBrating);
      console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
      console.log(Pa + Pb);
      return { itemArating, itemBrating };
    }

    // use random item pair
    const newrating = eloRating(usepair.eloA, usepair.eloB, 30, 1); //returns {itemArating , itemBrating }
    //update elo in db
    updateItemElo(usepair.idA, newrating.itemArating);
    updateItemElo(usepair.idA, newrating.itemArating);
    pairs = displayarrayreset();

    getItemInfo(pairs, items);
  }

  function randomrow(nrows) {
    //for continuos random play
    let row1 = Math.floor(Math.random() * nrows); //generates random number for search by row.id
    let row2 = Math.floor(Math.random() * nrows);
    if (row1 == row2) {
      //if the rows = the same then row 2 has 1 added to it
      row2 = row2 + 1;
      if (row2 == nrows) {
        // if row 2 = the number of rows then row 2 is set to 0 i.e first id by search
        row2 = 0;
      }
    }
    console.log(row1, row2);
  }

  //randomrow(2); //should = 1,0 || 0,1
  //randomrow(50); // should return any combo n n when  0 ≥ x < 50

  // function finrandomrow(rows) {
  //   // generate an array of all possible uniqe combos of items
  //   for (let x = 0; x < rows; x++) {
  //     // console.log(x);
  //     for (let y = 0; y < rows; y++) {
  //       if (x != y) {
  //         console.log(x, y);

  //       }
  //     }
  //   }
  // }

  // finrandomrow(5);

  async function test() {
    "use server";
    console.log("clicked");
  }

  return (
    <>
      <div className={styles.PageTitle}>
        <h1>vote page</h1>
        <p>just click on which is better to cast your vote</p>
      </div>
      <div className={styles.voteContainer}>
        <Votecards
          clickevent={awin}
          image={usepair.imgUrlA}
          innertext={usepair.nameA}
          styles={styles.voteA}
        />
        <Votecards
          clickevent={bwin}
          image={usepair.imgUrlB}
          innertext={usepair.nameB}
          styles={styles.voteB}
        />
        <Votecards
          clickevent={draw}
          image={null}
          innertext={"skip"}
          styles={styles.voteno}
        />
      </div>
    </>
  );
}
