"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TypingEffect from "@components/preloaders/MainPreloader/TypingEffect/TypingEffect";
import { Logos } from "../../utils/globals";
import styles from "../../components/preloader/Preloader.module.scss";

const ContactPage = () => {
  return (
    <div className={styles.preloaderWrapper}>
      <motion.div className={styles.preloaderContainer}>
        <motion.div
          initial={{ filter: "blur(1rem)", opacity: 0 }}
          animate={{ filter: "blur(0rem)", opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(1rem)",
            transition: { duration: 1, delay: 2.5 },
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className={styles.preloaderLogo}>
          <Image
            src={Logos[1]} // First image from the array
            alt="OR Logo"
            width={150}
            height={150}
            priority
          />
        </motion.div>

        {/* Second Image */}
        <motion.div
          alt="OR Studio Logo"
          initial={{
            filter: "blur(1.5rem)",
            scale: 0.5,
            opacity: 0,
            y: -150,
          }}
          animate={{
            filter: "blur(0rem)",
            scale: 1.8,
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 1.5,
            filter: "blur(1rem)",
            transition: { duration: 1 },
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className={styles.preloaderLogo}>
          <Image
            src={Logos[0]} // Second image from the array
            alt="OR Studio Logo"
            width={150}
            height={150}
            style={{
              width: "auto",
              height: "2rem",
            }}
            priority
          />
        </motion.div>

        <TypingEffect text="Architecture Visualization" />
      </motion.div>
    </div>
  );
};

export default ContactPage;
