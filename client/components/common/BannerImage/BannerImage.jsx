import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../BannerImage/BannerImage.module.scss";

const BannerImage = ({ image }) => {
  return (
    <motion.div
      className={styles.imageWrapper}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}>
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
