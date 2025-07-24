import React from 'react';
import { Typography, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </Title>
        <Text className="text-gray-600">Last updated: January 1, 2025</Text>
      </div>

      <Card>
        <div className="space-y-6">
          <section>
            <Title level={3}>1. Information We Collect</Title>
            <Paragraph>
              We collect information you provide directly to us, such as when you create 
              an account, make a purchase, or contact us for support. This may include:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Name and contact information</li>
              <li>Payment information</li>
              <li>Account credentials</li>
              <li>Communication preferences</li>
              <li>Purchase history and preferences</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>2. How We Use Your Information</Title>
            <Paragraph>
              We use the information we collect to:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Process transactions and send related information</li>
              <li>Provide customer service and support</li>
              <li>Send you technical notices and security alerts</li>
              <li>Communicate about products, services, and events</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>3. Information Sharing</Title>
            <Paragraph>
              We do not sell, trade, or otherwise transfer your personal information to 
              third parties without your consent, except as described in this policy. 
              We may share your information with:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Event organizers for ticket fulfillment</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>4. Data Security</Title>
            <Paragraph>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. This includes:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>5. Cookies and Tracking</Title>
            <Paragraph>
              We use cookies and similar technologies to enhance your experience, analyze 
              usage patterns, and provide personalized content. You can control cookie 
              settings through your browser preferences.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>6. Your Rights</Title>
            <Paragraph>
              You have the right to:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>File a complaint with regulatory authorities</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>7. Children's Privacy</Title>
            <Paragraph>
              Our service is not intended for children under 13 years of age. We do not 
              knowingly collect personal information from children under 13. If we become 
              aware that we have collected such information, we will take steps to delete it.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>8. Changes to This Policy</Title>
            <Paragraph>
              We may update this privacy policy from time to time. We will notify you of 
              any changes by posting the new policy on this page and updating the "Last 
              updated" date.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>9. Contact Us</Title>
            <Paragraph>
              If you have questions about this privacy policy, please contact us at:
              <br />
              Email: privacy@tickethub.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 Event Street, Downtown District, New York, NY 10001
            </Paragraph>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;