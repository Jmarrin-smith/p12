import styles from "./vote.module.css";

export default function VotePage() {
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
      </div>
    </>
  );
}
