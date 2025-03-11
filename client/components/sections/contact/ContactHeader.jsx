import styles from "@components/sections/contact/ContactHeader.module.scss";
const ContactHeader = ({ title, content }) => {
  return (
    <div className={styles.contactContainer}>
      <h2 className>{title}</h2>
      {content?.map((paragraph, index) => (
        <p key={index}>{paragraph || ""}</p>
      ))}
    </div>
  );
};

export default ContactHeader;
