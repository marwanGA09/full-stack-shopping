import styles from './ContactPage.module.css'; // Import CSS module

const ContactPage = () => {
  return (
    <div className={styles.contact}>
      <h1>Contact Us</h1>
      <p>We&apos;d love to hear from you!</p>
      <form action="#" method="post" className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      <div className={styles.contactInfo}>
        <h2>Other Ways to Contact Us</h2>
        <ul>
          <li>
            <a href="tel:+1234567890">Phone: +1 (234) 567-8900</a>
          </li>
          <li>
            <a href="mailto:support@amalgam.com">Email: support@amalgam.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;

// export default ContactPage;
