import styles from "@components/sections/contact/ContactHeader.module.scss";
const ContactHeader = ({ title, content }) => {
  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.contactTitle}>{title}</h2>
      {content.map((paragraph, index) => (
        <p key={index} className={styles.contactDescription}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default ContactHeader;
