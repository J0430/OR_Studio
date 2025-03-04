import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../BannerImage/BannerImage.module.scss";

const BannerImage = ({ image }) => {
  return (
    <motion.div
      className={styles.imageWrapper}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}>
      <Image
        src={image}
        alt="Project Image"
        fill
        priority
        className={styles.image}
      />
    </motion.div>
  );
};

export default BannerImage;
