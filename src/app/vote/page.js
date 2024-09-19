import styles from "./vote.module.css";

export default function VotePage() {
  `use server`;

  function fetchpair() {
    //query number of rows
    //randomrow(^)
    //change randomrow to return array
    //query array.1
    //add rows to displayarray
    //query array.2
    //add rows to displayarray
  }

  function displayarrayreset() {
    //displayarray pop all
  }

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
  }

  //redundant demo testing
  // eloRating(1200, 1000, 30, 1);
  // eloRating(1600, 600, 30, 0.5);
  // eloRating(1200, 1200, 30, 0);

  function awin() {
    // use random item pair
    // call elorating(a,b,30,1)
    //update elo in db
    //gen random pair
    //displayarrayreset
    //fetchrows
  }

  function bwin() {
    // use random item pair
    // call elorating(a,b,30,0)
    //update elo in db
    //gen random pair
    //fetch random pair
    //displayarrayreset
    //fetchrows
  }

  function draw() {
    // use random item pair
    // call elorating(a,b,30,0.5)
    //update elo in db
    //gen random pair
    //fetch random pair
    //displayarrayreset
    //fetchrows
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

  randomrow(2); //should = 1,0 || 0,1
  randomrow(50); // should return any combo n n when  0 ≥ x < 50

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

  return (
    <>
      <div className={styles.PageTitle}>
        <h1>vote page</h1>
        <p>just click on which is better to cast your vote</p>
      </div>
      <div className={styles.voteContainer}>
        <div onClick={eloRating()} className={styles.voteA}>
          <p>Option A</p>
        </div>
        <div className={styles.voteB} onClick={eloRating(1200, 1000, 30, 0)}>
          <p>Option B</p>
        </div>
        <div className={styles.voteno} onClick={eloRating(1200, 1000, 30, 0.5)}>
          <p>Skip</p>
        </div>
      </div>
    </>
  );
}
