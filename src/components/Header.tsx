"use client";

import React from "react";
import styles from "@/styles/header.module.css";

const Header: React.FC = () => {
  const createTask = () => {
    console.log("Create Task");
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.logo}>JoshTalks-TMA</div>

        <div onClick={createTask} className={styles.createBtn}>
          Create
        </div>
      </div>
    </div>
  );
};

export default Header;
