import React from 'react';
import { Typography, Card, Divider, Alert, Steps } from 'antd';
import { ClockCircleOutlined, DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const Refunds = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Refund Policy
        </Title>
        <Paragraph className="text-xl text-gray-600">
          Understanding our refund process and policies
        </Paragraph>
      </div>

      <Alert
        message="Important Notice"
        description="Refund policies may vary by event organizer. Always check the specific event's refund policy before purchasing."
        type="info"
        showIcon
        className="mb-8"
      />

      <Card className="mb-8">
        <Title level={3} className="mb-6">General Refund Policy</Title>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <ClockCircleOutlined className="text-2xl text-blue-500 mt-1" />
            <div>
              <Title level={5}>Standard Refund Window</Title>
              <Paragraph>
                Most tickets can be refunded up to 48 hours before the event start time. 
                Refunds requested within 48 hours of the event may not be processed unless 
                the event is cancelled by the organizer.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <DollarCircleOutlined className="text-2xl text-green-500 mt-1" />
            <div>
              <Title level={5}>Refund Amount</Title>
              <Paragraph>
                Full refunds include the ticket price minus processing fees (typically $2-5 per ticket). 
                Service fees are non-refundable unless the event is cancelled by the organizer.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <CheckCircleOutlined className="text-2xl text-purple-500 mt-1" />
            <div>
              <Title level={5}>Processing Time</Title>
              <Paragraph>
                Approved refunds are processed within 5-7 business days. The refund will appear 
                on your original payment method. Credit card refunds may take an additional 
                1-2 billing cycles to appear on your statement.
              </Paragraph>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <Title level={3} className="mb-6">How to Request a Refund</Title>
        
        <Steps direction="vertical" current={-1}>
          <Step
            title="Check Refund Eligibility"
            description="Verify that your event is eligible for refunds and within the refund window."
          />
          <Step
            title="Contact Support"
            description="Email us at refunds@tickethub.com or call +1 (555) 123-4567 with your order number."
          />
          <Step
            title="Provide Information"
            description="Include your order number, event details, and reason for the refund request."
          />
          <Step
            title="Wait for Confirmation"
            description="We'll review your request and send confirmation within 24 hours."
          />
          <Step
            title="Receive Refund"
            description="Approved refunds are processed within 5-7 business days."
          />
        </Steps>
      </Card>

      <Card className="mb-8">
        <Title level={3} className="mb-4">Special Circumstances</Title>
        
        <div className="space-y-4">
          <div>
            <Title level={5}>Event Cancellation</Title>
            <Paragraph>
              If an event is cancelled by the organizer, all ticket holders receive automatic 
              full refunds including all fees. No action is required from you.
            </Paragraph>
          </div>

          <div>
            <Title level={5}>Event Postponement</Title>
            <Paragraph>
              If an event is postponed, your tickets remain valid for the new date. If you 
              cannot attend the new date, you may request a full refund within 30 days of 
              the postponement announcement.
            </Paragraph>
          </div>

          <div>
            <Title level={5}>Venue Changes</Title>
            <Paragraph>
              If an event venue is changed, you may request a refund if the new venue is 
              significantly different or inconvenient. Refund requests must be made within 
              14 days of the venue change notification.
            </Paragraph>
          </div>
        </div>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <Title level={4} className="text-red-800 mb-3">Non-Refundable Items</Title>
        <ul className="space-y-2 text-red-700">
          <li>Tickets purchased within 48 hours of the event (unless event is cancelled)</li>
          <li>Service and processing fees (unless event is cancelled by organizer)</li>
          <li>Tickets marked as "No Refunds" at the time of purchase</li>
          <li>Tickets purchased through third-party resellers</li>
          <li>Digital downloads or streaming access codes</li>
        </ul>
      </Card>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <div className="text-center">
          <Title level={4} className="text-blue-800 mb-3">
            Need Help with a Refund?
          </Title>
          <Paragraph className="text-blue-700 mb-4">
            Our customer service team is here to help with your refund request.
          </Paragraph>
          <div className="space-y-2">
            <div>Email: refunds@tickethub.com</div>
            <div>Phone: +1 (555) 123-4567</div>
            <div>Hours: Monday-Friday 9AM-8PM, Saturday-Sunday 10AM-6PM</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Refunds;