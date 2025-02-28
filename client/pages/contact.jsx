import { motion } from "framer-motion";
import styles from "@styles/pages/contact.module.scss";
import DynamicForm from "@components/common/DynamicForm/DynamicForm";
import ContactHeader from "@components/sections/contact/ContactHeader";
import { logos } from "@utils/globals";
import * as yup from "yup";

const ContactSchema = yup.object().shape({
  firstName: yup.string().required("Enter your first name").min(2, "Too short"),
  lastName: yup.string().required("Enter your last name").min(2, "Too short"),
  email: yup.string().required("Enter your email").email("Invalid email"),
  phone: yup
    .string()
    .matches(/^[0-9\b]+$/, "Enter a valid phone number")
    .required("Enter your phone number"),
  message: yup
    .string()
    .required("Message cannot be empty")
    .min(10, "Message is too short"),
});

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}>
        {/* ✅ Contact Header */}
        <ContactHeader
          title="Let’s Get Started!"
          content={[
            "Ready to transform your architectural ideas into stunning visuals?",
            "Contact us today to discuss how we can bring your vision to life.",
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}>
          {/* ✅ Dynamic Form */}
          <DynamicForm
            schema={ContactSchema}
            title="Request a Proposal"
            logo={logos[0]}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
