import styles from "./vote.module.css";

export default function VotePage() {
  `use server`;

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
    // k is a constant number i.e.30
    itemArating = itemArating + K * (outcome - Pa);
    itemBrating = itemBrating + K * (1 - outcome - Pb);

    // updated Elo
    console.log("Updated Ratings:-");
    console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
    // math floor to round the figure to a whole number
    itemArating = Math.floor(itemArating);
    itemBrating = Math.floor(itemBrating);
    console.log(`itemArating = ${itemArating} itemBrating = ${itemBrating}`);
  }

  //redundant demo testing
  eloRating(1200, 1000, 30, 1);
  eloRating(1600, 600, 30, 0.5);
  eloRating(1200, 1200, 30, 0);

  return (
    <>
      <div className={styles.PageTitle}>
        <h1>vote page</h1>
        <p>just click on which is better to cast your vote</p>
      </div>
      <div className={styles.voteContainer}>
        <div className={styles.voteA}>
          <p>something</p>
        </div>
        <div className={styles.voteB}>
          <p>something</p>
        </div>
        <div className={styles.voteno}>
          <p>no</p>
        </div>
      </div>
    </>
  );
}
