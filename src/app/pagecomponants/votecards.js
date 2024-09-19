"use client";

export default function Votecards({ clickevent, innertext, image, styles }) {
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

  function handleclick() {
    clickevent();
  }
  return (
    <>
      <div onClick={handleclick} className={styles}>
        <image src={image} />
        <p>{innertext}</p>
      </div>
    </>
  );
}
