"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { SWRConfig } from "swr";

function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user.profileImageUrl ? (
        <Image
          src={user.profileImageUrl}
          alt="Profile"
          width={200}
          height={200}
        />
      ) : (
        <div>No profile image available</div>
      )}
      <h2>{user.username || "No username available"}</h2>
      <section>
        <h3>Voting Record</h3>
        {/* Voting record - to be added */}
        <ul>
          <li>
            <span style={{ color: "#008000" }}>Potatoes</span> /{" "}
            <span style={{ color: "#800000" }}>Hippopotami</span>
          </li>
          <li>
            <span style={{ color: "#008000" }}>Birthdays</span> /{" "}
            <span style={{ color: "#800000" }}>Smallpox</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ProfilePage;
