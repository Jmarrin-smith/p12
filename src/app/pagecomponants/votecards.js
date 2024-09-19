"use client";

export default function Votecards({ clickevent, innertext, image, styles }) {
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
