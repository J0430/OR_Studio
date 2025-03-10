import { useMediaQuery } from "react-responsive";
import styles from "@components/sections/contact/ContactHeader.module.scss";
const ContactHeader = ({ title, content }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div
      className={
        isMobile ? styles.mobileContactContainer : styles.contactContainer
      }>
      <h2 className>{title}</h2>
      {content?.map((paragraph, index) => (
        <p key={index}>{paragraph || ""}</p>
      ))}
    </div>
  );
};

export default ContactHeader;
