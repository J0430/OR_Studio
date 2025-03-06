import * as yup from "yup";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { logos } from "@utils/globals";
import Head from "next/head";
import styles from "@styles/pages/contact.module.scss";
import dynamic from "next/dynamic";

// Dynamic imports
const ContactHeader = dynamic(
  () => import("@components/sections/contact/ContactHeader")
);
const DynamicForm = dynamic(
  () => import("@components/common/DynamicForm/DynamicForm")
);
// ✅ Schema with correct field names
const ContactSchema = yup.object().shape({
  firstName: yup.string().required("Enter your first name").min(2, "Too short"), // ✅ Change "name" to "firstName"
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
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Head>
        <title>Contact Us | OR Studio</title>
        <meta
          name="description"
          content="Get in touch with OR Studio to bring your architectural vision to life. Contact us today!"
        />
        <meta
          name="keywords"
          content="Architecture, Visualization, Contact, OR Studio"
        />
        <meta name="author" content="OR Studio" />
        <meta property="og:title" content="Contact Us | OR Studio" />
        <meta
          property="og:description"
          content="Get in touch with OR Studio to bring your architectural vision to life."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dugudxkyu/image/upload/v1728046515/Offir%20projects/Contact%20us/contact_us_uphao8.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={isMobile ? styles.mobileContactPage : styles.contactPage}>
        <motion.div
          className={isMobile ? styles.mobileContent : styles.content}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          {/* ✅ Contact Header */}
          <ContactHeader
            title="Let’s Get Started!"
            content={[
              "Ready to transform your architectural ideas into stunning visuals?",
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}>
            <DynamicForm
              schema={ContactSchema}
              title="Request a Proposal"
              logo={logos[0]}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
