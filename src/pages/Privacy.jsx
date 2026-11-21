import Legal from '../components/Legal.jsx';

const POLICY = [
  { t: 'Information we collect', p: ['We collect your name, email address, delivery address, phone number and order history when you create an account or place an order.', 'We also collect basic device and usage data to keep the site working.'] },
  { t: 'How we use it', p: ['We use your information to process orders, provide support, send order updates and improve our store. With your consent we may send offers and newsletters.'] },
  { t: 'Cookies and storage', p: ['We use browser storage to remember your cart, your sign-in and your theme choice. You can clear this data in your browser settings at any time.'] },
  { t: 'Sharing your data', p: ['We share data only with delivery partners and payment providers who need it to fulfil your order. We never sell your personal information.'] },
  { t: 'Security', p: ['Passwords are stored as salted hashes, never as plain text. No online service is perfectly secure, so please use a strong, unique password.'] },
  { t: 'Your rights', p: ['You can ask us to access, correct or delete your personal data, or to stop marketing messages, by contacting support.'] },
  { t: 'Data retention', p: ['We keep order records for as long as needed for warranty, tax and legal purposes, then delete or anonymise them.'] },
  { t: 'Children', p: ['Our store is not intended for children under 13, and we do not knowingly collect their data.'] },
  { t: 'Changes to this policy', p: ['We may update this policy and will change the date above when we do.'] },
  { t: 'Contact us', p: ['For privacy questions, email privacy@gadgethub.in or write to GadgetHub Store, Phagwara, Punjab 144401, India.'] },
];

export default function Privacy() {
  return <Legal title="Privacy Policy" updated="19 November 2026" sections={POLICY} />;
}
