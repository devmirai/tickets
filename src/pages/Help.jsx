import React from 'react';
import { Typography, Collapse, Card, Input, Button } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

const Help = () => {
  const faqData = [
    {
      key: '1',
      question: 'How do I purchase tickets?',
      answer: 'Browse events on our homepage, select an event, choose your quantity, and click "Add to Cart". Then proceed to checkout to complete your purchase with secure payment processing.'
    },
    {
      key: '2',
      question: 'Can I cancel or refund my tickets?',
      answer: 'Refund policies vary by event. Most tickets can be refunded up to 48 hours before the event. Check the specific event\'s refund policy on the event details page or contact our support team.'
    },
    {
      key: '3',
      question: 'How will I receive my tickets?',
      answer: 'After purchase, you\'ll receive an email confirmation with your digital tickets. You can also download them from your confirmation page. Present the tickets on your mobile device or print them out.'
    },
    {
      key: '4',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard SSL encryption and secure payment processors to protect your personal and financial information. We never store your complete credit card details.'
    },
    {
      key: '5',
      question: 'What if an event is cancelled?',
      answer: 'If an event is cancelled by the organizer, you\'ll receive a full automatic refund within 5-7 business days. We\'ll also notify you via email about the cancellation and refund status.'
    },
    {
      key: '6',
      question: 'Can I transfer my tickets to someone else?',
      answer: 'Most tickets can be transferred to another person. You can do this through your account dashboard or by contacting our support team. Some events may have restrictions on transfers.'
    },
    {
      key: '7',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are processed securely through our payment partners.'
    },
    {
      key: '8',
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team via email at support@tickethub.com, call us at +1 (555) 123-4567, or use the contact form on our Contact page. We typically respond within 24 hours.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Help Center
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions and get the help you need.
        </Paragraph>
      </div>

      <Card className="mb-8">
        <div className="text-center">
          <Title level={3} className="mb-4">Search for Help</Title>
          <Search
            placeholder="What can we help you with?"
            enterButton={<SearchOutlined />}
            size="large"
            className="max-w-md"
          />
        </div>
      </Card>

      <Card title={
        <div className="flex items-center">
          <QuestionCircleOutlined className="mr-2 text-blue-500" />
          Frequently Asked Questions
        </div>
      }>
        <Collapse accordion>
          {faqData.map(faq => (
            <Panel header={faq.question} key={faq.key}>
              <Paragraph className="text-gray-700 mb-0">
                {faq.answer}
              </Paragraph>
            </Panel>
          ))}
        </Collapse>
      </Card>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <div className="text-center">
          <Title level={4} className="text-blue-800 mb-3">
            Still need help?
          </Title>
          <Paragraph className="text-blue-700 mb-4">
            Can't find what you're looking for? Our support team is here to help!
          </Paragraph>
          <Button type="primary" size="large">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Help;