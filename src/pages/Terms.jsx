import React from 'react';
import { Typography, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Terms of Service
        </Title>
        <Text className="text-gray-600">Last updated: January 1, 2025</Text>
      </div>

      <Card>
        <div className="space-y-6">
          <section>
            <Title level={3}>1. Acceptance of Terms</Title>
            <Paragraph>
              By accessing and using TicketHub, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>2. Use License</Title>
            <Paragraph>
              Permission is granted to temporarily download one copy of TicketHub materials 
              for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title, and under this license you may not:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>3. Ticket Purchases</Title>
            <Paragraph>
              All ticket sales are final unless otherwise specified by the event organizer. 
              Prices are subject to change without notice. We reserve the right to refuse 
              service to anyone for any reason at any time.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>4. User Accounts</Title>
            <Paragraph>
              You are responsible for safeguarding the password and for maintaining the 
              confidentiality of your account. You agree not to disclose your password 
              to any third party and to take sole responsibility for activities that 
              occur under your account.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>5. Privacy Policy</Title>
            <Paragraph>
              Your privacy is important to us. Please review our Privacy Policy, which 
              also governs your use of the service, to understand our practices.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>6. Disclaimer</Title>
            <Paragraph>
              The materials on TicketHub are provided on an 'as is' basis. TicketHub 
              makes no warranties, expressed or implied, and hereby disclaims and negates 
              all other warranties including without limitation, implied warranties or 
              conditions of merchantability, fitness for a particular purpose, or 
              non-infringement of intellectual property or other violation of rights.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>7. Limitations</Title>
            <Paragraph>
              In no event shall TicketHub or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or 
              due to business interruption) arising out of the use or inability to use 
              TicketHub materials, even if TicketHub or an authorized representative 
              has been notified orally or in writing of the possibility of such damage.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>8. Contact Information</Title>
            <Paragraph>
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@tickethub.com
              <br />
              Phone: +1 (555) 123-4567
            </Paragraph>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Terms;